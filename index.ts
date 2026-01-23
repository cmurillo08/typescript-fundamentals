type Pizza = {
    id: number,
    name: string,
    price: number,
}

type Order = {
    id: number,
    pizza: Pizza,
    status: "ordered" | "completed"
}


let nextPizzaId = 1;
let cashInRegister = 100
let nextOrderId = 1

const menu: Pizza [] = [
    { id: nextPizzaId++, name: "Margherita", price: 8 },
    { id: nextPizzaId++, name: "Pepperoni", price: 10 },
    { id: nextPizzaId++, name: "Hawaiian", price: 10 },
    { id: nextPizzaId++, name: "Veggie", price: 9 },
]

const orderHistory: Order[] = []

function addNewPizza(pizzaObj: Omit<Pizza, "id">): Pizza {
    const newPizza = {
        id: nextPizzaId++,
        ...pizzaObj
    }
    menu.push(newPizza) 
    return newPizza
}

addNewPizza({ name: "Chicken Bacon Ranch", price: 12 })
addNewPizza({ name: "BBQ Chicken", price: 12 })
addNewPizza({ name: "Spicy Sausage", price: 11 })


function placeOrder(pizzaName: string): Order | undefined {
    const selectedPizza = menu.find((pizzaObj : Pizza) => pizzaObj.name === pizzaName)
    if (!selectedPizza) {
        console.error(`${pizzaName} does not exist in the menu`)
        return
    }
    cashInRegister += selectedPizza.price
    const newOrder: Order = { id: nextOrderId++, pizza: selectedPizza, status: "ordered" }
    orderHistory.push(newOrder)
    return newOrder
}
 
// function addToArray<T>(array: T[], item: T): T[] {
//     array.push(item)
//     return array
// } 

// addToArray<Pizza>(menu, {id: nextPizzaId++, name: "Chicken Bacon Ranch", price: 12 })
// addToArray<Order>(orderHistory, { id: nextOrderId++, pizza: menu[2], status: "completed" })

function completeOrder(orderId: number): Order | undefined {
    const order = orderHistory.find(order => order.id === orderId)
    if (!order) {
        console.error(`orderId: ${orderId} was not found in the orderQueue`)
        return
    }
    order.status = "completed"  
    return order
}

export function getPizzaDetail(identifier: string | number): Pizza | undefined {
    if(typeof identifier === 'string') {
        return menu.find(pizza => pizza.name.toLowerCase() === identifier.toLowerCase())
    } else if(typeof identifier === 'number') {
        return menu.find(pizza => pizza.id === identifier)
    } else {
        throw new Error("Parameter `identifier` must be either a string or a number")
    }
}

placeOrder("Chicken Bacon Ranch")
placeOrder("Pepperoni")
completeOrder(1)
placeOrder("Anchovy")
placeOrder("Veggie")
completeOrder(2)

console.log("Menu:", menu)
console.log("Cash in register:", cashInRegister)
console.log("Order history:", orderHistory)