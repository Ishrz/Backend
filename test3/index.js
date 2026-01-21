const fs=require('fs')

console.log(process.argv[2])
// console.log(fs.readFile('./t.text'))
fs.readFile(process.argv[2],'utf8',(err,data)=>{
    console.log(data)
})


