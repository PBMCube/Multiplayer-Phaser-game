import {KeyBoardControl} from "../../controls/keyboard.class";
import {PlayerModel} from "./player.model";
import {Laser} from "../../props/weapon/laser.class";

export class Player {
    public player: any;
    private laser: Laser;
    private controls: KeyBoardControl;

    constructor(private options: PlayerModel, private gameInstance: any) {
        this.controls = new KeyBoardControl(this.gameInstance);
        this.createPlayer(this.gameInstance, options);
    }

    public createPlayer(gameInstance, shipOptions) {
        this.player = gameInstance.add.sprite(50, 50, 'shooter-sprite');
        gameInstance.physics.arcade.enable(this.player);

        this.player.name = shipOptions.name;
        this.player.body.bounce.y = 0;
        this.player.body.gravity.y = 0;
        this.player.anchor.setTo(0.5, 0.5);

        this.player.animations.add('accelerating', [1, 0], 50, false);
        this.player.body.drag.set(80);
        this.player.body.maxVelocity.set(100);
        this.player.body.collideWorldBounds = true;
        this.assignPickup(this.player, gameInstance);
    }

    public view() {

        //detect if player hits pickup and then create the weapon

        if (this.controls.gameControls.cursors.up.isDown) {
            this.gameInstance.physics.arcade.accelerationFromRotation(this.player.rotation, 100, this.player.body.acceleration);
            this.player.animations.play('accelerating');
        } else {
            this.player.body.acceleration.set(0);
        }

        if (this.controls.gameControls.cursors.left.isDown) {
            this.player.body.angularVelocity = -300;
        }

        else if (this.controls.gameControls.cursors.right.isDown) {
            this.player.body.angularVelocity = 300;
        } else {
            this.player.body.angularVelocity = 0;
        }

        if (this.controls.gameControls.fireWeapon.isDown) {
            if (this.laser) {
                this.laser.weapon.fire();
            }
        }
    }

    private assignPickup(player, game) {
        this.laser = new Laser(player, game);
    }

}