/**
 * ShoppingCartDemo
 * 作者Git：https://github.com/guangqiang-liu
 * 技术交流群：620792950
 * 作者QQ：1126756952
 * Created by guangqiang on 2017/11/5.
 */

import React, {Component} from 'react'
import {View, Text,Alert, TouchableOpacity,Button, TouchableHighlight,Image, StyleSheet, SectionList} from 'react-native'
import {commonStyle} from './commonStyle'
const shoppingCartData = require('./ShoppingCartData.json')

export default class ShoppingCart extends Component {

  constructor(props) {
    super(props)
    this.renderItem = this.renderItem.bind(this)
    this.renderSectionHeader = this.renderSectionHeader.bind(this)
    this.state = {
      status: [],
      isSelectedAllItem: false,
      totalNum: 0,
      totalPrice: 0.00,
      pressStatus: false,
      statusItem:null,
      quantity:0,
     loc:0,
     currentQuant:0,
     value:0,
     item:0
    }
  }
  _onHideUnderlay(){
    this.setState({ pressStatus: false });
  }
  _onShowUnderlay(){
    this.setState({ pressStatus: true });
  }
  onshow(){
    this.state.pressStatus=true;
  }
  componentWillMount() {
   let dataArr=shoppingCartData.data;
    let tempStatusArr = []
    for (let i = 0; i < dataArr.length; i++) {
      let items = dataArr[i].shopItems
      let shopObj = {}
      shopObj.checked = false
      shopObj.currentQuant=0;
      let tempItems = []
      for (let j = 0; j < items.length; j++) {
        let item = items[j]
        item.checked = false
        item.quantity = 0
        this.state.value=item.quantity
        tempItems.push(item)
      }
      shopObj.items = tempItems
      tempStatusArr.push(shopObj)
    }
    this.state.status = tempStatusArr
    console.log(this.state.status)
  }

  componentDidMount() {
    // 网络请求获取购物车数据
  }

  checkItem(sectionIndex, index,info) {
    
    let tempStatus = this.state.status
    let tempShop = tempStatus[sectionIndex]
    let tempShopItems = tempStatus[sectionIndex].items
    let item = tempShopItems[index]
    item.checked = !item.checked

    let isSelectedAllShopItem = true
    for (let j = 0; j < tempShopItems.length; j++) {
      let item = tempShopItems[j]
      if (!item.checked) {
        isSelectedAllShopItem = false
        break
      }
    }
    
    tempShop.checked = isSelectedAllShopItem

    let isSelectedAllShop = true
    for (let k = 0; k < tempStatus.length; k ++) {
      let shop = tempStatus[k]
      if (!shop.checked) {
        isSelectedAllShop = false
        break
      }
    }

    this.calculateCountAndPrice()
    this.setState({isSelectedAllItem: isSelectedAllShop, status: tempStatus})
  }

  checkedShop(index) {
    let tempStatus = this.state.status
    let shop = tempStatus[index]
    shop.checked = !shop.checked
    let items = shop.items
    for (let j = 0; j < items.length; j++) {
      let item = items[j]
      item.checked = shop.checked
    }

    let isSelectedAllShop = true
    for (let j = 0; j < tempStatus.length; j++) {
      let shop = tempStatus[j]
      if (!shop.checked) {
        isSelectedAllShop = false
        break
      }
    }

    this.calculateCountAndPrice()
    this.setState({isSelectedAllItem: isSelectedAllShop, status: tempStatus})
  }

  checkAllShop() {
    let tempSelectedAllItem = !this.state.isSelectedAllItem
    let tempStatus = this.state.status
    for (let i = 0; i < tempStatus.length; i++) {
      let shop = tempStatus[i]
      shop.checked = tempSelectedAllItem
      let items = shop.items
      for (let j = 0; j < items.length; j++) {
        let item = items[j]
        item.checked = tempSelectedAllItem
      }
    }

    this.calculateCountAndPrice()
    this.setState({isSelectedAllItem: tempSelectedAllItem, status: tempStatus})
  }

  minus(quantity, loc) {
    //let index=this.state.loc
    //let sectionIndex=this.state.quantity
    this.setState({
      quantity:this.state.quantity-1
    })
    sectionIndex=this.state.quantity
    index=this.state.loc
    let tempStatus = this.state.status
    let shop = tempStatus[sectionIndex]
    let items = shop.items
    let item = items[index]
    if (item.quantity <= item.minQuantity) {
      alert('less:'+item.minQuantity)
    } else {
      item.quantity -= 1
    }

    if (item.checked) {
      this.calculateCountAndPrice()
    }
    this.setState({status: tempStatus})
  }

  add(quantity, loc) {
    //this.setState({index: this.state.loc})
    //this.setState({sectionIndex:this.state.quantity})
    
    
    
    this.setState({
      quantity:this.state.quantity+1
    })
    sectionIndex=this.state.quantity
    index=this.state.loc
    let tempStatus = this.state.status
    let shop = tempStatus[sectionIndex]
    let items = shop.items
    let item = items[index]
    if (item.quantity >= item.maxQuantity) {
      alert('add:'+item.maxQuantity)
    } else {
      item.quantity += 1
    }
    if (item.checked) {
      this.calculateCountAndPrice()
    }
    this.setState({status: tempStatus})
    this.setState({})
  }

  calculateCountAndPrice() {
    let tempTotalNum = 0
    let tempTotalPrice = 0
    let tempStatus = this.state.status
    for (let i = 0; i < tempStatus.length; i ++) {
      let shop = tempStatus[i]
      let items = shop.items
      for (let j = 0; j < items.length; j++) {
        let item = items[j]
        if (item.checked) {
          tempTotalNum += 1
          tempTotalPrice += item.itemPrice * this.state.quantity
        }
      }
    }
    this.setState({totalNum: tempTotalNum, totalPrice: tempTotalPrice})
  }
 
  renderClick= info => {
    let item = info.item
    let index = info.index
    let sectionIndex = info.section.index
    let shop = this.state.status[sectionIndex]
    let statusItem = shop.items[index]
  
      return (info.item.quantity<1)?

      ( <View style={{flex:1}}>
          <Button onPress={() => this.buttonPress(info.item.quantity)} title="Add"></Button>
        </View>)
      :
      ( 
        <View style={{flexDirection: 'row', alignItems:"center", marginHorizontal: 10}}>
         <TouchableOpacity onPress={() => this.checkItem(sectionIndex, index,info)}>
           <Image source={require('./assets/Group.png')}/>
         </TouchableOpacity>
            <Text style={{ width: 30, textAlign: 'center' }}>{info.item.quantity}</Text>
        
         <TouchableOpacity onPress={() => this.checkItem(sectionIndex, index,info)}>
           <Image source={require('./assets/Group5.png')}/>
         </TouchableOpacity>
        
        </View>
        )
  }
  buttonPress(quantity){
    quantity=quantity+1;
    this.setState({})
  }
  IndexPress(){
    return ( 
      <View style={{flexDirection: 'row', alignItems:"center", marginHorizontal: 10}}>
       <TouchableOpacity onPress={() => this.minus(this.state.quantity,this.state.loc)}>
         <Image source={require('./assets/Group.png')}/>
       </TouchableOpacity>
       <Text style={{width: 30, textAlign: 'center'}}>{this.state.quantity}</Text>
      
       <TouchableOpacity onPress={() => this.add(this.state.quantity, this.state.loc)}>
         <Image source={require('./assets/Group5.png')}/>
       </TouchableOpacity>
      
      </View>
      )
  }
  renderItem = info => {
    let item = info.item
    let index = info.index
    let sectionIndex = info.section.index
    let shop = this.state.status[sectionIndex]
    let statusItem = shop.items[index]
    return (
      // <TouchableHighlight onPress={() => this.checkItem(sectionIndex, index,info)}
      //     style={ [styles.cellStyle,{backgroundColor:statusItem.checked ? '#E0FFFF' : 'white'}]}
      //     >
      
      <View style={[styles.cellStyle]} >
      
           
        
        <Image style={{width: 80, height: 80}} source={{uri: item.itemimg}}/>
        <View style={{justifyContent: commonStyle.around, flex: 1, marginHorizontal: 10, height: 50}} >
          <Text style={{fontSize: 16,fontWeight:'bold', color: commonStyle.greay}}>{item.itemName}</Text>
          
          <Text style={{fontSize: 13, color: commonStyle.greay}}>{`₹${item.itemPrice}`}</Text>
          
         </View>
          
        {this.renderClick(info)}
        

       
         {/* <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center, marginHorizontal: 10}}>
          <TouchableOpacity onPress={() => this.minus(sectionIndex, index)}>
            <Image source={require('./assets/Group.png')}/>
          </TouchableOpacity>
          <Text style={{width: 30, textAlign: 'center'}}>{statusItem.quantity}</Text>
          <TouchableOpacity onPress={() => this.add(sectionIndex, index)}>
            <Image source={require('./assets/Group5.png')}/>
            
          </TouchableOpacity>
        </View>  */}
        <TouchableHighlight onPress={() => this.checkItem(sectionIndex, index,info)}
          style={ [styles.cellStyle,{backgroundColor:statusItem.checked ? '#E0FFFF' : 'white'}]}
          >

          <Text>select</Text>
  
      </TouchableHighlight>
      </View>
    )
    
  }
  
  renderSectionHeader = info => {
    let section = info.section.key
    let index = info.section.index
    let shop = this.state.status[index]
    return (
      // <TouchableOpacity onPress={() => this.checkedShop(index)}>
      <View style={styles.sectionHeader}>
        
          {/* <Image style={styles.checkBox} source={shop.checked ? require('./assets/ic_selected.png') : require('./assets/ic_defult.png')} resizeMode={'center'}/> */}
        
        <Text style={{color: commonStyle.white, alignItems:'flex-start', fontSize: 17,marginHorizontal:30}}>{section}</Text>
      </View>
     // </TouchableOpacity>
    )
  }

  render() {
    let tempArr = shoppingCartData.data.map((item, index) => {
      let tempData = {}
      tempData.key = item.shopName
      tempData.index = index
      tempData.data = item.shopItems
      return tempData
    })
    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <Text style={{marginTop: 15, fontSize: 17}}>food cart</Text>
        </View>
        <SectionList keyExtractor={(item, index) => index}
          renderSectionHeader={this.renderSectionHeader}
          renderItem={this.renderItem}
          sections={tempArr}
          ItemSeparatorComponent={() => <View/>}
          ListHeaderComponent={() => <View/>}
          ListFooterComponent={() => <View/>}
        />
        <View style={styles.toolBar}>
          {/* <View style={{flex: 1, flexDirection: commonStyle.row, alignItems: commonStyle.center}}>
            <TouchableOpacity onPress={() => this.checkAllShop()}>
              <Image style={styles.checkBox} source={this.state.isSelectedAllItem ? require('./assets/ic_selected.png') : require('./assets/ic_defult.png')} resizeMode={'center'}/>
            </TouchableOpacity>
            <Text>Select all</Text>
          </View> */}
          <Text style={{marginHorizontal: 10,color:'white'}}>PAY ₹
            <Text style={{color: commonStyle.white}}>{parseFloat(this.state.totalPrice).toFixed(2)}</Text>
          </Text>
          <View style={{width: 120, backgroundColor: '#FA8072', alignItems: commonStyle.center, justifyContent: commonStyle.center, height: commonStyle.cellHeight}}>
            <Text style={{color: commonStyle.black}}>Item in Cart({this.state.totalNum})</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonStyle.white
  },
  container1: {
    flex: 1,
    flexDirection: 'column',
    margin: 30,
    marginTop: 560
  },
  navBar: {
    height: commonStyle.navHeight,
    alignItems: commonStyle.center,
    justifyContent: commonStyle.center,
    borderBottomWidth: commonStyle.lineWidth,
    borderBottomColor: commonStyle.lineColor
  },
  cellStyle: {
    flexDirection: commonStyle.row,
    alignItems: commonStyle.center,
    paddingVertical: 5,
   // borderBottomWidth: 1,
    borderBottomColor: commonStyle.lineColor,
    borderRadius:10,
    padding:10,
    margin:2,
    marginLeft:4,
    marginRight:4
    
  },
  sectionHeader: {
    height: 50,
    flexDirection: commonStyle.row,
    backgroundColor: '#DE3131',
    alignItems: 'center',
    marginBottom:2
  },
  
 checkitem:{
  backgroundColor:'blue'
 },
 


  toolBar: {
    height: commonStyle.cellHeight,
    flexDirection: commonStyle.row,
    alignItems: commonStyle.center
    ,justifyContent:'space-between',
    backgroundColor:'#DE3131',
    margin:0
  }
})