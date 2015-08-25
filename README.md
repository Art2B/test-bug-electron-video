#Hey Video

A client to run some videos

## Installation
1. Clone the project && `cd test-bug-electron-video`
2. `npm intall`
3. `grunt serve`. Now your site is available at `localhost:9000`

## Data Videos
Download some videos, put them in the `app/videos/` folder. Then advise `app/data/video.js` with the informations about your videos.

```javascript
// Data video object example
{
slug: 'slug_of_video',
name: 'name_of_video',
file: {
  lang: 'filename.extansion', // Replace lang by the lang you'll use in i18n
  lang: 'filename.extansion',
},
type: 'MIME type of video' // ex: 'video/mp4'
}
```

Next in `index.html`, change the `data-videoslug` to make them match with your videos.

## Build instruction
We use electron to build the app.
1. Download prebuilt binaries for your platform from [here](https://github.com/atom/electron/releases) and extract here somewhere
2. Make sur every relative path in the app start with `./` and then follow a relative path from the file
3. Use [asar](https://www.npmjs.com/package/asar) to pack the project folder (ex: `/coke-video`) with `asar pack /path/to/project`
4. Follow instructions you will found [there](http://electron.atom.io/docs/v0.30.0/tutorial/application-distribution/#packaging-your-app-into-a-file) with your asar file
5. Well done, your app is now built :-) !

Don't forget to add your videos `parking.mp4` and `objectifs.mp4` to the `app/videos` folder you'll have to create :-)
