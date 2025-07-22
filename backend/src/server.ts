import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import multer from 'multer';
import { config } from 'dotenv';
import OpenAI from 'openai';
import path from 'path';
import fs from 'fs';

// Load environment variables
config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    /https:\/\/.*\.choreoapis\.dev$/,
    /https:\/\/.*\.choreo\.dev$/
  ],
  credentials: true
}));
app.use(express.json());

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PNG, JPG, and GIF are allowed.'));
    }
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Process menu endpoint
app.post('/api/process-menu', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const { openaiKey } = req.body;
    if (!openaiKey) {
      return res.status(400).json({ error: 'OpenAI API key is required' });
    }

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: openaiKey
    });

    // Convert image to base64
    const base64Image = req.file.buffer.toString('base64');
    const imageUrl = `data:${req.file.mimetype};base64,${base64Image}`;

    // Analyze the menu image
    const menuAnalysis = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: "Analyze this menu image and extract all the food items. For each item, provide the name and a brief description. Return the response as a JSON array with objects containing 'name' and 'description' fields. Focus only on food items, ignore drinks, prices, and other non-food content."
            },
            {
              type: "input_image",
              image_url: `data:image/png;base64,${base64Image}`,
              "detail": "auto"
            },
          ]
        }
      ],
    });

    let menuItems;
    try {
      const analysisText = menuAnalysis.output_text || '[]';
      // Extract JSON from the response
      const jsonMatch = analysisText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        menuItems = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No valid JSON found in response');
      }
    } catch (parseError) {
      console.error('Error parsing menu analysis:', parseError);
      return res.status(500).json({ error: 'Failed to parse menu analysis' });
    }

    // Generate images for each menu item
    const processedItems = await Promise.all(
      menuItems.map(async (item: { name: string; description: string }) => {
        try {
          const imagePrompt = `Create a stunning, professional food photography image of ${item.name}. ${item.description}. The image should be high-quality, well-lit, appetizing, and suitable for a restaurant menu. Focus on making the dish look delicious and visually appealing with proper plating and garnishing.`;

          const imageResponse = await openai.images.generate({
            model: "dall-e-3",
            prompt: imagePrompt,
            size: "1024x1024",
            quality: "standard",
            n: 1,
          });

          return {
            name: item.name,
            description: item.description,
            image_url: imageResponse.data?.[0]?.url || ''
          };
        } catch (imageError) {
          console.error(`Error generating image for ${item.name}:`, imageError);
          return {
            name: item.name,
            description: item.description,
            image_url: '' // Fallback to empty string if image generation fails
          };
        }
      })
    );

    res.json({
      items: processedItems.filter(item => item.image_url) // Only return items with generated images
    });

  } catch (error) {
    console.error('Error processing menu:', error);
    res.status(500).json({ 
      error: 'Failed to process menu',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File size too large. Maximum size is 10MB.' });
    }
  }
  
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use('/{*any}', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 MenuGen API server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
});
