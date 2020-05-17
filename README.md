# Ad service assignment

## Tech stack
- TypeScript - main language
- express - handling requests
- MySQL - to store data
- Docker & docker-compose to create MySQL locally
- jest - testing

## Solution

The idea is that ad's URL is not directly returned. Instead, when a page loads it queries the API for a random Ad. It returns image url and the callback URL. 

On the backend side, when a random ad is returned from the database, the "load" action is added to another table (actions table).

The callback URL is another endpoint. It contains the ad ID. When user clicks the ad, the endpoint is hit, it queries the ad based on ID, it takes the target url and redirects the user to that page. Before that, the "click" action is added to the actions table.

The solution is depicted below:

[![](https://mermaid.ink/img/eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG4gICAgcGFydGljaXBhbnQgVyBhcyBXZWJzaXRlXG4gICAgcGFydGljaXBhbnQgQVBJIGFzIEFQSVxuICAgIHBhcnRpY2lwYW50IERCIGFzIE15U1FMXG5cbiAgICBXIC0-PitBUEk6IEdFVCAvYXBpL2Fkc1xuICAgIGFjdGl2YXRlIEFQSVxuICAgIFxuICAgIEFQSSAtPj4rREI6IGdldCByYW5kb20gYWRkXG4gICAgYWN0aXZhdGUgREJcbiAgICBEQiAtPj4tQVBJOiB7IGlkLCBpbWdVcmwgfVxuICAgIGRlYWN0aXZhdGUgREJcblxuICAgIEFQSSAtPj4rREI6IGluc2VydCBcImxvYWRcIiBhY3Rpb24gZm9yIGFkIGBpZGBcbiAgICBhY3RpdmF0ZSBEQlxuICAgIERCIC0-Pi1BUEk6IG9rXG4gICAgZGVhY3RpdmF0ZSBEQlxuXG4gICAgQVBJLT4-LVc6IHsgaW1nVXJsLCByZWRpcmVjdFVSTCB9XG4gICAgZGVhY3RpdmF0ZSBBUElcblxuICAgIFctPj4rVzogdXNlciBjbGlja3MgYW4gYWRcblxuICAgIFcgLT4-K0FQSTogR0VUIC9hcGkvYWRzL2NhbGxiYWNrLzppZCBcbiAgICBhY3RpdmF0ZSBBUElcbiAgICBBUEktPj4rREI6IGdldCBhZCBieSBgaWRgXG4gICAgYWN0aXZhdGUgREJcbiAgICBEQi0-Pi1BUEk6IHsgdGFyZ2V0VXJsIH1cbiAgICBkZWFjdGl2YXRlIERCXG4gICAgQVBJLT4-K0RCOiBpbnNlcnQgXCJjbGlja1wiIGFjdGlvbiBmb3IgYWQgYGlkYFxuICAgIGFjdGl2YXRlIERCXG4gICAgREItPj4tQVBJOiBva1xuICAgIGRlYWN0aXZhdGUgREJcblxuICAgIEFQSS0-Pi1XOiByZWRpcmVjdCB0byBgdGFyZ2V0VXJsYFxuICAgIGRlYWN0aXZhdGUgQVBJIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifSwidXBkYXRlRWRpdG9yIjpmYWxzZX0)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG4gICAgcGFydGljaXBhbnQgVyBhcyBXZWJzaXRlXG4gICAgcGFydGljaXBhbnQgQVBJIGFzIEFQSVxuICAgIHBhcnRpY2lwYW50IERCIGFzIE15U1FMXG5cbiAgICBXIC0-PitBUEk6IEdFVCAvYXBpL2Fkc1xuICAgIGFjdGl2YXRlIEFQSVxuICAgIFxuICAgIEFQSSAtPj4rREI6IGdldCByYW5kb20gYWRkXG4gICAgYWN0aXZhdGUgREJcbiAgICBEQiAtPj4tQVBJOiB7IGlkLCBpbWdVcmwgfVxuICAgIGRlYWN0aXZhdGUgREJcblxuICAgIEFQSSAtPj4rREI6IGluc2VydCBcImxvYWRcIiBhY3Rpb24gZm9yIGFkIGBpZGBcbiAgICBhY3RpdmF0ZSBEQlxuICAgIERCIC0-Pi1BUEk6IG9rXG4gICAgZGVhY3RpdmF0ZSBEQlxuXG4gICAgQVBJLT4-LVc6IHsgaW1nVXJsLCByZWRpcmVjdFVSTCB9XG4gICAgZGVhY3RpdmF0ZSBBUElcblxuICAgIFctPj4rVzogdXNlciBjbGlja3MgYW4gYWRcblxuICAgIFcgLT4-K0FQSTogR0VUIC9hcGkvYWRzL2NhbGxiYWNrLzppZCBcbiAgICBhY3RpdmF0ZSBBUElcbiAgICBBUEktPj4rREI6IGdldCBhZCBieSBgaWRgXG4gICAgYWN0aXZhdGUgREJcbiAgICBEQi0-Pi1BUEk6IHsgdGFyZ2V0VXJsIH1cbiAgICBkZWFjdGl2YXRlIERCXG4gICAgQVBJLT4-K0RCOiBpbnNlcnQgXCJjbGlja1wiIGFjdGlvbiBmb3IgYWQgYGlkYFxuICAgIGFjdGl2YXRlIERCXG4gICAgREItPj4tQVBJOiBva1xuICAgIGRlYWN0aXZhdGUgREJcblxuICAgIEFQSS0-Pi1XOiByZWRpcmVjdCB0byBgdGFyZ2V0VXJsYFxuICAgIGRlYWN0aXZhdGUgQVBJIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifSwidXBkYXRlRWRpdG9yIjpmYWxzZX0)

## Endpoints

### GET /api/ads
returns random ad.

Example response:
```json
{
    "url": "/api/ads/callback/71fa14ee-982b-11ea-979a-0242ac160002",
    "img": "https://via.placeholder.com/600x250?text=Cloudinary.com"
}
```

### GET /api/ads/callback/:id
Retrieves an ad based on the id parameter and redirects to associated target url.

### GET /api/ads/metrics/:date
date - is a date in format of `yyyy-MM-dd` e.g. `2020-05-17`
It returns metrics for selected date.

Example response:
```json
[
    {
        "id": "80bdca7a-982b-11ea-979a-0242ac160002",
        "clicks": 2,
        "loads": 4,
        "targetUrl": "https://www.biedronka.pl/pl"
    },
    {
        "id": "71fa14ee-982b-11ea-979a-0242ac160002",
        "clicks": 1,
        "loads": 3,
        "targetUrl": "https://www.cloudinary.com"
    }
]
```

## Development

- start a docker container
`docker-compose up`
- run db migrations
`npm run db:migrate`
- start an app
`npm run start:dev`