const csvFilePath='./tripshire'
const csv=require('csvtojson')
csv()
.fromFile(csvFilePath)
.on('json',(jsonObj)=>{
    
})
.on('done',(error)=>{
    console.log('end')
})
