# 🐕 Dog AI - Multilingual AI Image Generator

A modern, multilingual AI image generation application that creates stunning images from text prompts in any language. Built with Next.js, TypeScript, and Together AI.

## ✨ Features

- 🌐 **Multilingual Support**: Accepts prompts in any language and automatically translates them to English
- 🎨 **High-Quality Image Generation**: Uses FLUX.1-schnell-Free model for fast and quality image generation
- 🎯 **Smart Prompt Enhancement**: AI-powered prompt enhancement for better image results
- 📱 **Responsive Design**: Beautiful UI that works on all devices
- 🌙 **Dark Mode Support**: Built-in dark mode for comfortable viewing
- 🔄 **Real-time Updates**: Live preview of image dimensions
- 📊 **Modern UI Components**: Built with Redux UI for a polished look
- 🔒 **Secure API Handling**: Environment-based API key management

## 🚀 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Redux UI
- **AI Services**: Together AI
- **State Management**: React Hooks
- **Image Processing**: Base64 encoding/decoding

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/code3-dev/dogai.git
cd dogai
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env.local` or `.env` file in the root directory:
```env
TOGETHER_API_KEY=your_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fcode3-dev%2Fdogai)

The easiest way to deploy Dog AI is using the [Vercel Platform](https://vercel.com).

## 🔧 Configuration

### Environment Variables

- `TOGETHER_API_KEY`: Your Together AI API key (required)
- `NEXT_PUBLIC_APP_URL`: Your application's public URL (required, default: http://localhost:3000)

### Image Generation Settings

- **Default Resolution**: 1024x768
- **Min Resolution**: 256x256
- **Max Resolution**: 1440x1440
- **Step Size**: 16 pixels (for optimal model performance)

## 🎯 Usage

1. Enter your prompt in any language
2. (Optional) Click the wand icon to enhance your prompt
3. Adjust image dimensions using the sliders
4. Click "Generate" to create your image
5. View and download the generated image

## 🎨 UI Components

- **Header**: Navigation and theme toggle with Redux UI components
- **Prompt Input**: Multilingual text input with enhancement using Redux UI
- **Dimension Sliders**: Real-time size adjustment with Redux UI controls
- **Image Card**: Display and download generated images with Redux UI card component
- **Loading Animation**: Visual feedback during generation
- **Mobile Navigation**: Responsive bottom navigation with Redux UI

## 🌐 Supported Languages

The application supports input in any language and automatically translates to English for optimal image generation. Special support for:

- English
- Farsi
- Spanish
- French
- German
- And many more...

## 🔒 Security

- API keys are stored securely in environment variables
- No client-side exposure of sensitive data
- Rate limiting and error handling
- Secure image processing

## 📱 Responsive Design

- Mobile-first approach
- Adaptive layouts
- Touch-friendly controls
- Optimized for all screen sizes

## 🚀 Performance

- Fast image generation
- Optimized API calls
- Efficient state management
- Smooth animations

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Together AI for providing the image generation API
- Next.js team for the amazing framework
- All contributors and users of the project

## 📞 Support

For support, please:
- Open an issue in the GitHub repository
- Contact via email: [h3dev.pira@gmail.com](mailto:h3dev.pira@gmail.com)
- Reach out on Telegram: [@h3dev](https://t.me/h3dev)
- Follow us on Instagram: [@h3dev.pira](https://instagram.com/h3dev.pira)

---

Made with ❤️ by Hossein Pira