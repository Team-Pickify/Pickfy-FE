
const selectarray = (newarr,categoryarray,magazinearray,categorybtn,magazinebtn)=>{
    
  if(categorybtn[0] === 1){
      return newarr
    }
  else{
      let cate = []
      let maga = []
      for(let i = 0;i<categorybtn.length;i++){
          if(categorybtn[i] === 1){
              cate = [...cate,categoryarray[i]];
          }
      }
      for(let i = 0;i<magazinebtn.length;i++){
          if(magazinebtn[i] === 1){
              maga = [...maga,magazinearray[i]];
          }
      }
      let neww = []
      for(let i= 0;i<newarr.length;i++){
        let check = false;
        for(let j=0;j<cate.length; j++){
          if(cate[j].name === newarr[i].categoryName){
            check = true; break;
          }
        }
        if(check) neww = [...neww,newarr[i]]
      }
      let neww2 = []
      for(let i= 0;i<neww.length;i++){
        let check = false;
        for(let j=0;j<maga.length; j++){
          if(maga[j].name === neww[i].magazineTitle){
            check = true; break;
          }
        }
        if(check){
          neww2 = [...neww2,neww[i]]
        }
      }
      return neww2
  }}

export default selectarray