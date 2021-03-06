let table = document.getElementById("table-wrapper")
let region = document.getElementById("region")
let product = document.getElementById("product")
let clickList = []
let dataList = []
let sourceData = [{
  product: "手机",
  region: "华东",
  sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]
}, {
  product: "手机",
  region: "华北",
  sale: [80, 70, 90, 110, 130, 145, 150, 160, 170, 185, 190, 200]
}, {
  product: "手机",
  region: "华南",
  sale: [220, 200, 240, 250, 260, 270, 280, 295, 310, 335, 355, 380]
}, {
  product: "笔记本",
  region: "华东",
  sale: [50, 60, 80, 110, 30, 20, 70, 30, 420, 30, 20, 20]
}, {
  product: "笔记本",
  region: "华北",
  sale: [30, 35, 50, 70, 20, 15, 30, 50, 710, 130, 20, 20]
}, {
  product: "笔记本",
  region: "华南",
  sale: [80, 120, 130, 140, 70, 75, 120, 90, 550, 120, 110, 100]
}, {
  product: "智能音箱",
  region: "华东",
  sale: [10, 30, 4, 5, 6, 5, 4, 5, 6, 5, 5, 25]
}, {
  product: "智能音箱",
  region: "华北",
  sale: [15, 50, 15, 15, 12, 11, 11, 12, 12, 14, 12, 40]
}, {
  product: "智能音箱",
  region: "华南",
  sale: [10, 40, 10, 6, 5, 6, 8, 6, 6, 6, 7, 26]
}]
var tableHeader = `
    <tr>
      <th>商品</th>
      <th>地区</th>
      <th>1月</th>
      <th>2月</th>
      <th>3月</th>
      <th>4月</th>
      <th>5月</th>
      <th>6月</th>
      <th>7月</th>
      <th>8月</th>
      <th>9月</th>
      <th>10月</th>
      <th>11月</th>
      <th>12月</th>
    </tr>
`
function bindHTML(data){
  var strHTML=``;
  table.innerHTML=tableHeader;
  data.forEach(item => {
    strHTML+=`<tr>
    <th>${item.product}</th>
    <th>${item.region}</th>
    <th>${item.sale[0]}</th>
    <th>${item.sale[1]}</th>
    <th>${item.sale[2]}</th>
    <th>${item.sale[3]}</th>
    <th>${item.sale[4]}</th>
    <th>${item.sale[5]}</th>
    <th>${item.sale[6]}</th>
    <th>${item.sale[7]}</th>
    <th>${item.sale[8]}</th>
    <th>${item.sale[9]}</th>
    <th>${item.sale[10]}</th>
    <th>${item.sale[11]}</th>
  </tr>`
  });
  table.innerHTML+=strHTML;
}
// bindHTML(sourceData);

function createCheckBox(container,arg){
  let strAll = `
  <label class="container">全部选择
    <input type="checkbox" checkbox-type="all">
    <span class="checkmark"></span>
  </label> `
  let strLabel = ``
  arg.forEach(item=>{
    strLabel +=  `
    <label class="container">${item.text}
      <input type="checkbox" checkbox-type="children" value=${item.text}>
      <span class="checkmark"></span>
    </label>` 
  })
  container.innerHTML+=strAll
  container.innerHTML+=strLabel
  
  container.onclick = function(){
    if(event.target.type == 'checkbox'){
      let attr= event.target.getAttribute('checkbox-type')
      let value = event.target.value;
      let ary=Array.from(container.children)
      ary.shift();
      let checkAll = ary.shift();
      if(attr=="all"){
        bindHTML(sourceData)
        if(event.target.checked==true){
          ary.forEach(item=>item.children[0].checked='true')
        }else{
          return false
        }
      }else{
        let count=0;
        ary.forEach(item=>{
          if(item.children[0].checked){
            count++;
          }
        })
        if(count==3){
          checkAll.children[0].checked="true"
        }else{
          checkAll.children[0].checked=0
        }
        if(count==0){
          return false
        }
        let index = clickList.indexOf(value)
        if(clickList.indexOf(value)<0){
          clickList.push(value)
          getData();
        }else{
          clickList.splice(index,1)
          getData()
        }
      }
    }
  }
}
createCheckBox(region,[{
  value: 1,
  text: '华东'
},{
  value: 2,
  text: '华南'
},{
  value: 3,
  text: '华北'
}])

createCheckBox(product,[{
  value: 1,
  text: '手机'
},{
  value: 2,
  text: '笔记本'
},{
  value: 3,
  text: '智能音箱'
}])

function getData(){
  dataList=[]
  let arr = []
  let flag
  if(clickList.length > 1){
        
    var flag1 = sourceData.find(item=>item.product==clickList[0])
    var flag2 = sourceData.find(item=>item.product==clickList[1])
    var flag3 = sourceData.find(item=>item.region==clickList[0])
    var flag4 = sourceData.find(item=>item.region==clickList[1])
    
  }
  for(let i=0;i<sourceData.length;i++){
    for(let j=0;j<clickList.length;j++){
      
      if(clickList.length==1 || flag1 && flag2 || flag3 && flag4){
      if(clickList[j]==sourceData[i].product ){
        if(dataList.indexOf(sourceData[i])<0){
          dataList.push(sourceData[i])
          bindHTML(dataList)
        } 
      }
      if(clickList[j]==sourceData[i].region ){
        if(dataList.indexOf(sourceData[i])<0){
          dataList.push(sourceData[i])
          bindHTML(dataList)
        }
      }}else{
        if(clickList[j]==sourceData[i].product || clickList[j]==sourceData[i].region){
          if(dataList.indexOf(sourceData[i])<0){
            dataList.push(sourceData[i])
            // bindHTML(dataList)
          }else{
            arr.push(sourceData[i])
            bindHTML(arr)
          }  
        }
      } 
    }
  }
}

