/* ########################################################
   TNT CIRCLE MOD - UNIVERSELAND SPECIAL
   Comandos: /anillo [cantidad] (Defecto: 12)
   Uso: Usa la caña de pescar
   ######################################################## */

var WAND_ID = 346; 
var tntPower = 12;

function chatHook(text) {
    var msg = text.toLowerCase().split(" ");
    if (msg[0] === "/anillo") {
        preventDefault();
        if (msg[1]) {
            tntPower = parseInt(msg[1]);
            clientMessage("§c[!] §fPotencia del anillo ajustada a: §e" + tntPower);
        } else {
            clientMessage("§e[Uso] §f/anillo [cantidad]");
        }
    }
}

function spawnTNTRing() {
    var x = getPlayerX();
    var y = getPlayerY();
    var z = getPlayerZ();
    var radius = 2.5;

    clientMessage("§c§l¡BOOM! §r§7Invocando " + tntPower + " TNTs...");
    Level.playSound(x, y, z, "random.fuse", 1, 1);

    for (var i = 0; i < tntPower; i++) {
        var angle = (i / tntPower) * Math.PI * 2;
        
        var nx = x + (radius * Math.cos(angle));
        var nz = z + (radius * Math.sin(angle));
        
        var tnt = Level.spawnMob(nx, y + 1, nz, 65);
        var velX = Math.cos(angle) * 0.7;
        var velZ = Math.sin(angle) * 0.7;
        
        setVelX(tnt, velX);
        setVelY(tnt, 0.3);
        setVelZ(tnt, velZ);
    }
}

function onUseItem(x, y, z, item, block, side, px, py, pz) {
    if (item == WAND_ID) {
        spawnTNTRing();
    }
}

function useItem(x, y, z, item) {
    if (item == WAND_ID) {
        preventDefault();
        spawnTNTRing();
    }
}
