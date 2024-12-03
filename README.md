# cappuccin.io

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
