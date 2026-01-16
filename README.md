# Adobe Express Content Publisher Add-On

A beautiful, React-based Adobe Express Add-On that helps you create and publish content to LinkedIn and Slack with compliance checks and brand management.

## Features

✨ **Content Creation**
- Rich text input for your content
- Dropdown selection between Image and Design content types
- Compliance check toggle for content validation
- Brand details image upload support

🎨 **Beautiful UI**
- Modern pastel color scheme
- Smooth animations and transitions
- Responsive design
- Toast notifications for user feedback

🚀 **Integrations**
- **Post to LinkedIn**: Share your content with image and text
- **Send to Slack**: Send messages to your Slack workspace

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

3. Build the project:
```bash
npm run build
```

4. Start development server:
```bash
npm start
```

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
