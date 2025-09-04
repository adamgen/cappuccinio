# cappuccin.io

# Todo

The project was inteded to run with lit with no need for a build step, one of our clients needs the app to be built, so we have it built. Ideally, we will support both using a pre-built environment and a drop in `<script>` tag.

- [ ] Add a vite config 
- [ ] Consider https://stackoverflow.com/questions/63121593/how-can-i-publish-an-npm-module-with-both-commonjs-and-es6-versions
- [ ] Consider `Conditional exports` https://nodejs.org/api/packages.html#conditional-exports

## Pack a zip

Run 

```
cd static/src 
echo -e "\nclients/*\n\!clients/xtra" >> .gitignore
npm pack 
tar -xvzf
zip -r package.zip package/
rm -rf package
```

And send package.zip
