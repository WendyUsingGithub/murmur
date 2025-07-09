async function test() {
  console.log("A");
  await new Promise(resolve => setTimeout(resolve, 5000)); // 暫停這裡
  console.log("B");
}

test();
console.log("C");
