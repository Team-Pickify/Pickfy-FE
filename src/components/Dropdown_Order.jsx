import styled from "styled-components"

function Dropdown_Order({arr,setplacearray,setisDropdown,setorder,lat,long}) {

    const listclick = (id)=>{
        if(id === 0){
            const newarr = arr.sort((a,b)=>(Math.abs(lat-a.latitude)+Math.abs(long-a.longitude))-(Math.abs(lat-b.latitude)+Math.abs(long-b.longitude)))
            setorder("거리순")
            setisDropdown(0)
            setplacearray(newarr)
        }
        else{
            const newarr = arr.sort((a,b)=>b.likeCount-a.likeCount)
            setorder("좋아요순")
            setisDropdown(0)
            setplacearray(newarr)
        }
    }

    return (
      <div style={{display:"flex",flexDirection:"column",width:"9%",height:"4rem"}}>
        <Btn onClick={()=>{listclick(0)}}>거리순</Btn>
        <Btn onClick={()=>{listclick(1)}}>좋아요순</Btn>
      </div>
    );
  }

  const Btn = styled.button`
  border:none;
  z-index:1000;
  background-color:white;
  font-size:0.6rem;
  height:50%;
  `
  
  export default Dropdown_Order;