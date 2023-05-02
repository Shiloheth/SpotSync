
export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>SpotSync</title>
      </head>
      <body>
        <div>
          {children}
        </div>
      </body>
    </html>)
}