pragma solidity ^0.8.0;

contract Game {
    
    struct Player {
        bool exists;
        uint256 trophies;
    }
    
    mapping (address => Player) players;
    
    function registerPlayer() public {
        require(!players[msg.sender].exists, "Player already registered");
        players[msg.sender].exists = true;
    }

    function getTrophies() public view returns(uint256) {
    require(players[msg.sender].exists, "Player not registered");
    return players[msg.sender].trophies;
}
}