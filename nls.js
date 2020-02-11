const path = require('path')
const fs = require('fs')
const fxp = require('fast-xml-parser')

const dirs = ['pcCom1','psCom','psPop','copyright','psRes1','psRes','psLbl','psLbl1','psLbl2','psLbl3','psErr','psErr1']
const lang = ['ar','en','en_u1','es_mx','fr_ca','he','zh','zh_tw']


for(let i=0;i<dirs.length;i++){
    
	fs.readdir(__dirname+'/nlshome/'+dirs[i],function(err){
        
		if(err) return
		for(let j=0;j<lang.length;j++){
			
			fs.readFile(__dirname+'/nlshome/'+dirs[i]+'/'+dirs[i]+'_'+lang[j]+'.xml',function(error,data){
                
				if(error) return
				const str = "define(" + (JSON.stringify(fxp.parse(data.toString()))).replace(/\}$/,'')+",'en-gb':true,'es-mx':true,'ar':true,'he':true,'fr-ca':true,'zh':true,'zh-tw':true})"
				fs.writeFile(__dirname+'/nls/'+lang[j]+'/'+dirs[i]+'.js',str,function(e){
					console.log(e)
					if(e) return
					console.log(dirs[i]+' and language '+lang[j]+' file is saved')
				})
			})
		}
	})
}