# Adobe Express Content Publisher Add-On

A professional, React-based Adobe Express Add-On for enterprise content creation and publishing to LinkedIn and Slack with compliance checks and brand management.

## Features

**Content Management**
- Rich text input for content creation
- Content type selection (Image/Design)
- Compliance check validation toggle
- Brand asset image upload with multi-file support

**Professional Interface**
- Corporate design system with clean aesthetics
- Professional color scheme and typography
- Responsive 320px layout optimized for Adobe panels
- Real-time notification system

**Platform Integrations**
- **LinkedIn Publishing**: Share content with image and text parameters
- **Slack Messaging**: Send messages directly to your Slack workspace

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
