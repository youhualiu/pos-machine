// ======= default data =======
const menu = document.querySelector("#menu");
const cart = document.querySelector("#cart");
const totalAmount = document.querySelector("#total-amount");
const button = document.querySelector("#submit-button");

// 菜單資料
let productData = [
  {
    id: "product-1",
    imgUrl:
      "https://images.unsplash.com/photo-1558024920-b41e1887dc32?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    name: "馬卡龍",
    price: 90
  },
  {
    id: "product-2",
    imgUrl:
      "https://images.unsplash.com/photo-1560691023-ca1f295a5173?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    name: "草莓",
    price: 60
  },
  {
    id: "product-3",
    imgUrl:
      "https://images.unsplash.com/photo-1568271675068-f76a83a1e2d6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    name: "奶茶",
    price: 100
  },
  {
    id: "product-4",
    imgUrl:
      "https://images.unsplash.com/photo-1514517604298-cf80e0fb7f1e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    name: "冰咖啡",
    price: 180
  }
];
// ======= 請從這裡開始 =======
// 1. 使用菜單資料去動態產出 "menu" 的區塊
productData.forEach(element => {
  menu.innerHTML += `
    <div class="col-3">
      <div class="card">
        <img src=${element.imgUrl} class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${element.name}</h5>
          <p class="card-text">${element.price}</p>
          <a href="#" class="btn btn-primary">加入購物車</a>
        </div>
      </div>
    </div>
  `
})

// 2. 按下 "加入購物車" 時，會動態產生新的節點，並且把資料傳到購物車清單
let cartData = []
let checkItemIndex // 負責檢視購物車清單是否已經有這項產品的資料

menu.addEventListener('click', e => {
  let target = event.target
  if (target.classList.contains('btn-primary')) {
    let name = target.parentElement.firstElementChild.innerHTML
    let price = target.parentElement.children[1].innerHTML
    if (checkItem(`${name}`)) {
      // 發現品項已經加入過購物清單後，直接修改陣列禮品項的數量與總價格
      cartData[checkItemIndex].number++
      cartData[checkItemIndex].totalPrice += cartData[checkItemIndex].price
    } else {
      // 發現品項還沒有加入過購物清單，因此把品項資訊加入到陣列中
      cartData.push({
        name: `${name}`,
        price: Number(`${price}`),
        number: 1,
        totalPrice: Number(`${price}`)
      })
    }
    console.log(cartData)
    // 每次點選 "加入購物車" 就把購物車資料陣列中的資料重新印出來。
    printCartData()
    // 讓購物車自動結算結帳金額
    cartTotalAmount()
  }
})

let printCartData = () => {
  cart.innerHTML = ''
  cartData.forEach(element => {
    cart.innerHTML += `
      <li class="list-group-item">${element.name} X ${element.number} 小計：${element.totalPrice}</li> 
    `
  })
}

// 負責檢查品項有沒有被加入到購物車過，回傳 true or false
let checkItem = (name) => {
  let check = false
  let itemIndex
  for (let e = 0; e < cartData.length; e++) {
    if (cartData[e].name === name) {
      check = true
      // true 的情況下，會記錄品項的編號
      checkItemIndex = e
    }
  }
  if (check) {
    return true
  } else {
    return false
  }
}

// 3.購物車會自動計算總金額
let cartTotalAmount = () => {
  let total = 0
  cartData.forEach(element => {
    total += element.totalPrice
  })

  totalAmount.innerHTML = total
  return total
}

// 4.送出訂單後會跳出會跳出收據
button.addEventListener('click', e => {
  let billText = ''
  if (cartTotalAmount() > 0) {
    billText += '感謝購買'
    cartData.forEach(element => {
      billText += `
${element.name} * ${element.number} 小計 : ${element.totalPrice}`
    })
    billText += `
總金額 : ${cartTotalAmount(cartData)}`
  } else {
    billText = "You haven't buy anything!"
  }
  alert(billText)
  cartData = []
  printCartData()
  totalAmount.innerHTML = '--'
})



