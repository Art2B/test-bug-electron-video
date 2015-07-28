#Coke Video

A client to run some videos

## Installation
1. Clone the project && `cd coke-video`
2. `npm intall`
3. `grunt serve`. Now your site is available at `localhost:9000`

## Data Videos
Download some videos, put them in the `app/videos/` folder. Then advise `app/data/video.js` with the informations about your videos.

```javascript
// Data video object example
{
name: 'name_of_video',
file: 'filename.extansion',
type: 'MIME type of video'
}
```