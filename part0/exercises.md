# 0.4
```
browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
server-->browser: 302 Redirect
note over browser:
browser reloads the notes page
end note
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
server-->browser: HTML-code
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
server-->browser: main.js
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: data.json
browser->server: HTTP GET https://studies.cs.helsinki.fi/favicon.ico
server-->browser: favicon.ico
```

# 0.5
```
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
server-->browser: HTML-code
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: main.css
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
server-->browser: spa.js
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: data.json
browser->server: HTTP GET https://studies.cs.helsinki.fi/favicon.ico
server-->browser: favicon.ico
```

# 0.6
```
browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
server-->browser: [{"message":"note created"}]
```
