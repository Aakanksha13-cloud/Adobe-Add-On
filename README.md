# Adobe Express Content Publisher Add-On

A stunning, React-based Adobe Express Add-On for creative content creation and publishing to LinkedIn and Slack with compliance checks and brand management.

## Features

**Content Management**
- Rich text input for content creation
- Content type selection (Image/Design)
- Interactive compliance check toggle
- Brand asset image upload with multi-file support

**Beautiful Interface**
- Vibrant gradient design with purple-blue color scheme
- Smooth animations and hover effects
- Full viewport height (100vh) for immersive experience
- 320px width optimized for Adobe panels
- Custom gradient scrollbar
- Real-time toast notifications with gradients
- Glassmorphism effects and backdrop blur

**Platform Integrations**
- **LinkedIn Publishing**: Share content with image and text parameters
- **Slack Messaging**: Send messages directly to your Slack workspace

## Design Highlights

- 🎨 Beautiful gradient backgrounds (Purple → Blue → Pink)
- ✨ Animated gradient title with underline accent
- 🌈 Shimmer effects on primary button
- 💫 Transform effects on hover for interactive elements
- 🎯 Modern rounded corners and smooth transitions
- 📎 Intuitive file upload with visual feedback

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Aakanksha13-cloud/Adobe-Add-On.git
cd Adobe-Add-On
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

The app will be available at `http://localhost:9000`

**Note:** This is currently a standalone React application. Adobe Express SDK integration will be added later for deployment as an Adobe Add-on.

## Development

- `npm run dev` - Start development mode with watch
- `npm run build` - Build for production
- `npm start` - Start webpack dev server

## Technologies Used

- React 18
- React Toastify for notifications
- Adobe CCWeb Add-On SDK
- Webpack for bundling
- CSS3 with modern features

## Project Structure

```
Adobe-Add-On/
├── src/
│   ├── index.html      # HTML template
│   ├── index.jsx       # React entry point
│   ├── App.jsx         # Main application component
│   └── App.css         # Styles with pastel colors
├── dist/               # Built files
├── manifest.json       # Adobe Add-On manifest
├── package.json        # Dependencies
└── webpack.config.js   # Webpack configuration
```

## Usage

1. Enter your content text in the textarea
2. Select content type (Image or Design)
3. Toggle compliance check if needed
4. Upload brand images
5. Click "Create Content"
6. After successful creation, use the action buttons to:
   - Post to LinkedIn with your content
   - Send message to Slack

## License

ISC
