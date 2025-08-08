# 🎬 Movie Explorer

A fully functional Movie Explorer App built with Next.js, TypeScript, and Tailwind CSS that allows users to search and explore movies and TV series using the OMDb API.

## ✨ Features

### 🔍 Search & Display
- **Search Bar**: Type movie/series names to find results
- **Responsive Card Grid**: Beautiful card layout showing:
  - Movie poster image
  - Title
  - Type (movie or series)
  - Year of release
- **OMDb API Integration**: Uses the OMDb API with your provided API key
- **10 Results Per Page**: Pagination controls for easy navigation

### 🎛️ Filters
- **Type Filter**: Dropdown to filter by Movie or Series
- **Year Filter**: Input field to filter by release year
- **Combined Queries**: Filters work together with search queries

### 🎭 Movie Details Modal (Bonus Feature)
- **Click to View**: Click any movie card to open detailed modal
- **Comprehensive Information**: Shows:
  - Full title
  - Poster
  - Plot
  - Actors
  - Genre
  - IMDB Rating
  - Released year
  - Director
  - Runtime

### 🎨 UI & UX
- **Tailwind CSS**: Modern, responsive styling
- **Smooth Transitions**: Hover effects and animations
- **Loading States**: Spinners and loading indicators
- **Error Handling**: User-friendly error messages
- **Fully Responsive**: Works on mobile and desktop
- **Dark Mode Support**: Automatic dark/light theme switching

### 📄 Pagination
- **Smart Pagination**: Displays page numbers and navigation
- **API Integration**: Fetches specific pages from OMDb API
- **Total Results**: Shows total results count from API

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd applyo-movie-explorer
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```bash
   OMDB_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Technology Stack

- **Framework**: Next.js 15.2.0 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API**: OMDb API (Open Movie Database)
- **State Management**: React Hooks (useState, useEffect)
- **Images**: Next.js Image Optimization
- **Routing**: App Router (file-based routing)

## 📁 Project Structure

```
/
├── app/                # Next.js App Router
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Main application page
│   └── globals.css     # Global styles
├── components/         # React components
│   ├── MovieCard.tsx   # Individual movie card
│   ├── MovieModal.tsx  # Movie details modal
│   ├── SearchBar.tsx   # Search and filter interface
│   └── Pagination.tsx  # Pagination controls
├── types/              # TypeScript type definitions
│   └── movie.ts        # Movie and API response types
├── utils/              # Utility functions
│   └── api.ts          # OMDb API integration
├── .env.local          # Environment variables (create this)
└── next.config.ts      # Next.js configuration
```

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory with your OMDb API key:

```bash
OMDB_API_KEY=your_api_key_here
```

You can get a free API key from [OMDb API](http://www.omdbapi.com/apikey.aspx).

### Image Domains
Configured to allow images from:
- `m.media-amazon.com`
- `ia.media-imdb.com`

## 🎯 Usage

1. **Search**: Enter a movie or TV series name in the search bar
2. **Filter**: Use the type dropdown and year input to refine results
3. **Browse**: Navigate through pages using pagination controls
4. **Explore**: Click on any movie card to view detailed information
5. **Close**: Use the X button or press Escape to close the modal

## 🌟 Key Features Implementation

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Grid layout that adapts to screen size
- Touch-friendly interface elements

### Performance
- Next.js Image optimization for faster loading
- Lazy loading of movie details
- Efficient state management with React hooks

### Accessibility
- Keyboard navigation support
- Screen reader friendly
- Proper ARIA labels and semantic HTML

### Error Handling
- Graceful API error handling
- User-friendly error messages
- Fallback states for missing data

## 📱 Responsive Breakpoints

- **Mobile**: 1 column grid
- **Small**: 2 columns
- **Medium**: 3 columns  
- **Large**: 4 columns
- **Extra Large**: 5 columns

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6)
- **Background**: Gray-50 (light) / Gray-900 (dark)
- **Text**: Gray-900 (light) / White (dark)
- **Borders**: Gray-300 (light) / Gray-600 (dark)

### Typography
- **Headings**: Bold, large text
- **Body**: Regular weight, readable sizes
- **Labels**: Small, medium weight

### Spacing
- Consistent 4px grid system
- Responsive padding and margins
- Card spacing optimized for readability

## 🔮 Future Enhancements

- [ ] Add to favorites functionality
- [ ] Advanced filtering options
- [ ] Movie recommendations
- [ ] User reviews and ratings
- [ ] Export search results
- [ ] Offline support with service workers

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
