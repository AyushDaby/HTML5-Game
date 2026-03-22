const coinArgs = {
    // Canvas context will be provided by something else
    // x and y will be randomised

    width: 80,
    height: 80,
    movementVector: -3, // Moves to the length
    
    // target will be passed by something else
    event: "coinCollected",
    objToPassOnCollide: { value: 1 }, 
    
    spriteSrc: "./assets/parakeet.png",
    spriteWidth: 768,
    spriteHeight: 768
};

export default coinArgs;