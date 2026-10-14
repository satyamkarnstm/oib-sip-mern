const storeSockets = new Set();


const socketHandler=(io)=>{
io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);

  // Store registers itself
  socket.on('registerStore', (storeId) => {
    //storeSockets.add(socket.id);
    socket.join(storeId);
    console.log(` Store ${storeId} joined room`);
  });

  // Customer sends order
  socket.on('sendOrder', (orderData) => {
    console.log('Order received from customer:', orderData);

    // Send order to all connected stores
   // storeSockets.forEach(storeSocketId => {
      io.to(orderData.storeId).emit('newOrder', orderData);
    //});
  });
// Handle disconnect
  socket.on('disconnect', () => {
    storeSockets.delete(socket.id);
    console.log(`Client disconnected: ${socket.id}`);
  });
});


}
module.exports=socketHandler