let b = { q: 1, e: 2 };
let a = b;
a.q = 999;
console.log(b.q); // 999

async function test() {
  console.log("A");
  await new Promise(resolve => setTimeout(resolve, 5000)); // 暫停這裡
  console.log("B");
}

test();
console.log("C");
