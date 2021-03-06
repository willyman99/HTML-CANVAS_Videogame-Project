class Enemy {
    constructor(ctx, canvas, background, player, image, scale, type) {
        this.ctx = ctx
        this.background = background
        this.player = player
        this.canvas = canvas

        this.enemyTypes = 6
        this.type = this.setType()

        this.setSkin()

        this.w = this.setSize().enemyW
        this.h = this.setSize().enemyH

        this.hMultiplier = 1
        this.wScale = 1

        this.posX = canvas.w
        this.posY = this.setPosY()

        this.speedX = this.setSpeed()

        this.flash = 0
    }

    //Tipos de enemigos:
    //Type A => objetos, humanos y animales pequeños
    //Type B => humanos y animales grandes
    //Type C+ => coches y otros vehiculos *en movimiento positivo al background
    //?Type C2 => coches y otros vehiculos *en movimiento negativo al background
    //Type D => obstaculos de carretera
    //Type EUp => ??
    //Type EDown => obstaculos altos de cesped

    setType() {
        const randomSpawnType = Math.floor(Math.random() * this.enemyTypes)
        const randomInSpawnType = Math.floor(Math.random() * 2)
        let randomType = ''
        switch (randomSpawnType) {
            case 0:
                randomType = 'A'
                break;
            case 1:
                randomType = 'B'
                break;
            case 2:
                switch (randomInSpawnType) {
                    case 0:
                        randomType = 'C+'
                        break
                    case 1:
                        randomType = 'C-'
                        break
                }
                break;
            case 3:
                randomType = 'D'
                break
            case 4:
                switch (randomInSpawnType) {
                    case 0:
                        randomType = 'EUp'
                        break
                    case 1:
                        randomType = 'EDown'
                        break
                }
                break
            case 5:
                const ZProbability = Math.floor(Math.random() * 10)
                if (ZProbability === 9 || this.player.phase === 6) {
                    randomType = 'Z'
                }
                break
        }
        return randomType
    }

    setSkin() {
        this.skin = new Image()
        this.skinFlash = new Image()
        switch (this.type) {
            case 'A':
                const ASkins = 2
                const randomASkin = Math.floor(Math.random() * ASkins)
                switch (randomASkin) {
                    case 0:
                        this.skin.src = 'images/A/blinky.png'
                        this.skinFlash.src = 'images/A/blinkyFlash.png'
                        this.wScale = 1.3493
                        this.hMultiplier = 1
                        break
                    case 1:
                        this.skin.src = 'images/A/funzo.png'
                        this.skinFlash.src = 'images/A/funzoFlash.png'
                        this.wScale = 0.7403
                        this.hMultiplier = 1
                        break
                }
                break
            case 'B':
                const BSkins = 3
                const randomBSkin = Math.floor(Math.random() * BSkins)
                switch (randomBSkin) {
                    //Estos estaran invertidos 
                    case 0:
                        this.skin.src = 'images/B/kang.png'
                        this.skinFlash.src = 'images/B/kangFlash.png'
                        this.wScale = 1.3678
                        this.hMultiplier = 1.3
                        break
                    case 1:
                        this.skin.src = 'images/B/robo-burns.png'
                        this.skinFlash.src = 'images/B/robo-burnsFlash.png'
                        this.wScale = 1.8018
                        this.hMultiplier = 1
                        break
                    case 2:
                        this.skin.src = 'images/B/sideshowBob.png'
                        this.skinFlash.src = 'images/B/sideshowBobFlash.png'
                        this.wScale = 1.9691
                        this.hMultiplier = 1
                        break
                }
                break
            case 'C+':
                const CPlusSkins = 3
                const randomCPlusSkin = Math.floor(Math.random() * CPlusSkins)
                switch (randomCPlusSkin) {
                    case 0:
                        this.skin.src = 'images/C/C+/eisenhower.png'
                        this.skinFlash.src = 'images/C/C+/eisenhowerFlash.png'
                        this.wScale = 1.6333
                        this.hMultiplier = 1.2
                        break
                    case 1:
                        this.skin.src = 'images/C/C+/hoverCar.png'
                        this.skinFlash.src = 'images/C/C+/hoverCarFlash.png'
                        this.wScale = 1.6703
                        this.hMultiplier = 1.3
                        break
                    case 2:
                        this.skin.src = 'images/C/C+/radmobile.png'
                        this.skinFlash.src = 'images/C/C+/radmobileFlash.png'
                        this.wScale = 2.5592
                        this.hMultiplier = 1.2
                        break
                }
                break
            case 'C-':
                const CMinusSkins = 3
                const randomCMinusSkin = Math.floor(Math.random() * CMinusSkins)
                switch (randomCMinusSkin) {
                    case 0:
                        this.skin.src = 'images/C/C-/obstaclesTruck.png'
                        this.skinFlash.src = 'images/C/C-/obstaclesTruckFlash.png'
                        this.wScale = 2.3012
                        this.hMultiplier = 1.5
                        break
                    case 1:
                        this.skin.src = 'images/C/C-/policeCar.png'
                        this.skinFlash.src = 'images/C/C-/policeCarFlash.png'
                        this.wScale = 1.8452
                        this.hMultiplier = 1
                        break
                    case 2:
                        this.skin.src = 'images/C/C-/starline.png'
                        this.skinFlash.src = 'images/C/C-/starlineFlash.png'
                        this.wScale = 2.2028
                        this.hMultiplier = 1
                        break
                }
                break
            case 'D':
                const DSkins = 3
                const randomDSkin = Math.floor(Math.random() * DSkins)
                switch (randomDSkin) {
                    case 0:
                        this.skin.src = 'images/D/jebedias.png'
                        this.skinFlash.src = 'images/D/jebediasFlash.png'
                        this.wScale = 0.4679
                        this.hMultiplier = 1
                        break
                    case 1:
                        this.skin.src = 'images/D/megaDonut.png'
                        this.skinFlash.src = 'images/D/megaDonutFlash.png'
                        this.wScale = 0.8965
                        this.hMultiplier = 1
                        break
                    case 2:
                        this.skin.src = 'images/D/nuclearBomb.png'
                        this.skinFlash.src = 'images/D/nuclearBombFlash.png'
                        this.wScale = 1.0686
                        this.hMultiplier = 1
                        break
                    case 3:
                        this.skin.src = 'images/D/couch.png'
                    this.skinFlash.src = 'images/D/couchFlash.png'
                    this.wScale = 1
                    this.hMultiplier = 1
                        break
                    case 4:
                        this.skin.src = 'images/D/crappyRV.png'
                    this.skinFlash.src = 'images/D/crappyRVFlash.png'
                    this.wScale = 1
                    this.hMultiplier = 1
                        break
                    case 5:
                        this.skin.src = 'images/D/crushedCar.png'
                    this.skinFlash.src = 'images/D/crushedCarFlash.png'
                    this.wScale = 1
                    this.hMultiplier = 1
                        break
                    case 6:
                        this.skin.src = 'images/D/donutTruck.png'
                    this.skinFlash.src = 'images/D/donutTruckFlash.png'
                    this.wScale = 1
                    this.hMultiplier = 1
                        break
                    case 7:
                        this.skin.src = 'images/D/dumpsterBlue.png'
                    this.skinFlash.src = 'images/D/dumpsterBlueFlash.png'
                    this.wScale = 1
                    this.hMultiplier = 1
                        break
                    case 8:
                        this.skin.src = 'images/D/dumpsterGreen.png'
                    this.skinFlash.src = 'images/D/dumpsterGreenFlash.png'
                    this.wScale = 1
                    this.hMultiplier = 1
                        break
                    case 9:
                        this.skin.src = 'images/D/firstPMofAustralia.png'
                    this.skinFlash.src = 'images/D/firstPMofAustraliaFlash.png'
                    this.wScale = 1
                    this.hMultiplier = 1
                        break
                    case 10:
                        this.skin.src = 'images/D/fortAdventure.png'
                    this.skinFlash.src = 'images/D/fortAdventureFlash.png'
                    this.wScale = 1
                    this.hMultiplier = 1
                        break
                    case 11:
                        this.skin.src = 'images/D/hansMechman.png'
                    this.skinFlash.src = 'images/D/hansMechmanFlash.png'
                    this.wScale = 1
                    this.hMultiplier = 1
                        break
                    case 12:
                        this.skin.src = 'images/D/morticianCarriage.png'
                    this.skinFlash.src = 'images/D/morticianCarriageFlash.png'
                    this.wScale = 1
                    this.hMultiplier = 1
                        break
                    case 13:
                        this.skin.src = 'images/D/old1958.png'
                    this.skinFlash.src = 'images/D/old1958Flash.png'
                    this.wScale = 1
                    this.hMultiplier = 1
                        break
                    case 14:
                        this.skin.src = 'images/D/pieMan.png'
                    this.skinFlash.src = 'images/D/pieManFlash.png'
                    this.wScale = 1
                    this.hMultiplier = 1
                        break
                    case 15:
                        this.skin.src = 'images/D/tollBooth.png'
                    this.skinFlash.src = 'images/D/tollBoothFlash.png'
                    this.wScale = 1
                    this.hMultiplier = 1
                        break
                    case 16:
                        this.skin.src = 'images/D/tortureStand.png'
                    this.skinFlash.src = 'images/D/tortureStandFlash.png'
                    this.wScale = 1
                    this.hMultiplier = 1
                        break
                    case 17:
                        this.skin.src = 'images/D/X-RayTruck.png'
                    this.skinFlash.src = 'images/D/X-RayTruckFlash.png'
                    this.wScale = 1
                    this.hMultiplier = 1
                        break
                    case 18:
                        this.skin.src = 'images/D/lookout.png'
                    this.skinFlash.src = 'images/D/lookoutFlash.png'
                    this.wScale = 1
                    this.hMultiplier = 1
                        break
                    case 19:
                        this.skin.src = 'images/D/holoTree.png'
                    this.skinFlash.src = 'images/D/holoTreeFlash.png'
                    this.wScale = 1
                    this.hMultiplier = 1
                        break
                }
                break
            case 'EUp':
            case 'EDown':
                const EUpSkins = 18
                const randomEUpSkin = Math.floor(Math.random() * EUpSkins)
                switch (randomEUpSkin) {
                    case 0:
                        this.skin.src = 'images/E/carPileup.png'
                        this.skinFlash.src = 'images/E/carPileupFlash.png'
                        this.wScale = 0.8614
                        this.hMultiplier = 1
                        break
                    case 1:
                        this.skin.src = 'images/E/lardLad.png'
                        this.skinFlash.src = 'images/E/lardLadFlash.png'
                        this.wScale = 0.5043
                        this.hMultiplier = 1
                        break
                    case 2:
                        this.skin.src = 'images/E/libertyLisa.png'
                        this.skinFlash.src = 'images/E/libertyLisaFlash.png'
                        this.wScale = 0.4821
                        this.hMultiplier = 1
                        break
                    case 3:
                        this.skin.src = 'images/E/monster.png'
                        this.skinFlash.src = 'images/E/monsterFlash.png'
                        this.wScale = 0.6888
                        this.hMultiplier = 1
                        break
                    case 4:
                        this.skin.src = 'images/E/waterCar.png'
                        this.skinFlash.src = 'images/E/waterCarFlash.png'
                        this.wScale = 1.3212
                        this.hMultiplier = 1
                        break
                    case 5:
                        this.skin.src = 'images/E/totem.png'
                        this.skinFlash.src = 'images/E/totemFlash.png'
                        this.wScale = 0.4367
                        this.hMultiplier = 1
                        break
                    case 6:
                        this.skin.src = 'images/E/beerTruckSpill.png'
                    this.skinFlash.src = 'images/E/beerTruckSpillFlash.png'
                    this.wScale = 1
                    this.hMultiplier = 0.75
                        break
                    case 7:
                        this.skin.src = 'images/E/britishRoundabout.png'
                    this.skinFlash.src = 'images/E/britishRoundaboutFlash.png'
                    this.wScale = 0.4047
                    this.hMultiplier = 1
                        break
                    case 8:
                        this.skin.src = 'images/E/carPillar.png'
                    this.skinFlash.src = 'images/E/carPillarFlash.png'
                    this.wScale = 0.3048
                    this.hMultiplier = 1.5
                        break
                    case 9:
                        this.skin.src = 'images/E/christRedeemer.png'
                    this.skinFlash.src = 'images/E/christRedeemerFlash.png'
                    this.wScale = 0.6938
                    this.hMultiplier = 1
                        break
                    case 10:
                        this.skin.src = 'images/E/comicCrystals.png'
                    this.skinFlash.src = 'images/E/comicCrystalsFlash.png'
                    this.wScale = 0.9924
                    this.hMultiplier = 1
                    break
                    case 11:
                        this.skin.src = 'images/E/dipperFlipper.png'
                    this.skinFlash.src = 'images/E/dipperFlipperFlash.png'
                    this.wScale = 0.721
                    this.hMultiplier = 1
                    break
                    case 12:
                        this.skin.src = 'images/E/duffBlimp.png'
                    this.skinFlash.src = 'images/E/duffBlimpFlash.png'
                    this.wScale = 1.5762
                    this.hMultiplier = 1
                    break
                    case 13:
                        this.skin.src = 'images/E/eyeballsOfDeath.png'
                    this.skinFlash.src = 'images/E/eyeballsOfDeathFlash.png'
                    this.wScale = 0.7624
                    this.hMultiplier = 1
                        break
                    case 14:
                        this.skin.src = 'images/E/hot-dogStand.png'
                    this.skinFlash.src = 'images/E/hot-dogStandFlash.png'
                    this.wScale = 0.7721
                    this.hMultiplier = 1
                    break
                    case 15:
                        this.skin.src = 'images/E/mech.png'
                    this.skinFlash.src = 'images/E/mechFlash.png'
                    this.wScale = 0.6029
                    this.hMultiplier = 1
                    break
                    case 16:
                        this.skin.src = 'images/E/radioactiveManTheRide.png'
                    this.skinFlash.src = 'images/E/radioactiveManTheRideFlash.png'
                    this.wScale = 0.7432
                    this.hMultiplier = 1
                    break
                    case 17:
                        this.skin.src = 'images/E/simpsonsTreehouse.png'
                    this.skinFlash.src = 'images/E/simpsonsTreehouseFlash.png'
                    this.wScale = 0.7303
                    this.hMultiplier = 1
                        break
                    case 18:
                        this.skin.src = 'images/E/sphinx.png'
                    this.skinFlash.src = 'images/E/sphinxFlash.png'
                    this.wScale = 1.249
                    this.hMultiplier = 0.8
                    break
                }
                break

            case 'Z':
                const ZSkins = 3
                const randomZSkin = Math.floor(Math.random() * ZSkins)
                switch (randomZSkin) {
                    case 0:
                        this.skin.src = 'images/Z/nuclearPowerPlant.png'
                        this.skinFlash.src = 'images/Z/nuclearPowerPlantFlash.png'
                        this.wScale = 1.0661
                        this.hMultiplier = 1
                        break
                }
                break
        }
    }

    setSize() {
        let dimensionsByType = {
            enemyH: 0,
            enemyW: 0
        }
        switch (this.type) {
            case 'A':
                dimensionsByType.enemyH = ((this.background.boundaryBottom - this.background.grassHeight) / 10) * this.hMultiplier //a decidir
                dimensionsByType.enemyW = dimensionsByType.enemyH * this.wScale
                break
            case 'B':
                //Este esta invertido porque su tamaño es en funcion del ancho del personaje, no de su altura.
                dimensionsByType.enemyW = (this.player.initialW / 1.5) * this.hMultiplier //a decidir
                dimensionsByType.enemyH = dimensionsByType.enemyW * this.wScale
                break
            case 'C+':
            case 'C-':
                dimensionsByType.enemyH = ((this.background.roadHeight / 3) * 0.8) * this.hMultiplier //a decidir
                dimensionsByType.enemyW = dimensionsByType.enemyH * this.wScale
                break
            case 'D':
                dimensionsByType.enemyH = (this.background.roadHeight / 2) * this.hMultiplier //a decidir
                dimensionsByType.enemyW = dimensionsByType.enemyH * this.wScale
                break
            case 'EUp':
            case 'EDown':
                dimensionsByType.enemyH = (this.background.roadHeight) * this.hMultiplier //a decidir
                dimensionsByType.enemyW = dimensionsByType.enemyH * this.wScale
                break
            case 'Z':
                dimensionsByType.enemyH = (this.background.roadHeight * 1.5) * this.hMultiplier //a decidir
                dimensionsByType.enemyW = dimensionsByType.enemyH * this.wScale
                break
        }
        return dimensionsByType
    }

    setPosY() {
        const randomSpawnPosY_MIN = this.background.boundaryTop
        const randomSpawnPosY_MAX = this.background.boundaryBottom - this.h
        let randomSpawnPosY = 0
        switch (this.type) {
            case 'A':
                const randomSpawnPosY_MIN_A = randomSpawnPosY_MIN //a decidir
                const randomSpawnPosY_MAX_A = randomSpawnPosY_MAX //a decidir
                randomSpawnPosY = Math.floor(Math.random() * (randomSpawnPosY_MAX_A + 1 - randomSpawnPosY_MIN_A) + randomSpawnPosY_MIN_A)
                break
            case 'B':
                const randomSpawnPosY_MIN_B = (randomSpawnPosY_MIN + (this.background.boardwalkHeight / 3)) - this.h //a decidir
                const randomSpawnPosY_MAX_B = randomSpawnPosY_MAX //a decidir
                randomSpawnPosY = Math.floor(Math.random() * (randomSpawnPosY_MAX_B + 1 - randomSpawnPosY_MIN_B) + randomSpawnPosY_MIN_B)
                break
            case 'C+':
                const randomSpawnPosY_MIN_Cplus = randomSpawnPosY_MIN + this.background.boardwalkHeight //a decidir
                const randomSpawnPosY_MAX_Cplus = randomSpawnPosY_MAX - this.background.boardwalkHeight //a decidir
                randomSpawnPosY = Math.floor(Math.random() * (randomSpawnPosY_MAX_Cplus + 1 - randomSpawnPosY_MIN_Cplus) + randomSpawnPosY_MIN_Cplus)
                break
            case 'C-':
                const randomSpawnPosY_MIN_Cminus = randomSpawnPosY_MIN + this.background.boardwalkHeight //a decidir
                const randomSpawnPosY_MAX_Cminus = randomSpawnPosY_MAX - this.background.boardwalkHeight //a decidir
                randomSpawnPosY = Math.floor(Math.random() * (randomSpawnPosY_MAX_Cminus + 1 - randomSpawnPosY_MIN_Cminus) + randomSpawnPosY_MIN_Cminus)
                break
            case 'D':
                const randomSpawnPosY_MIN_D = randomSpawnPosY_MIN + this.background.boardwalkHeight //a decidir
                const randomSpawnPosY_MAX_D = randomSpawnPosY_MAX - this.background.boardwalkHeight //a decidir
                randomSpawnPosY = Math.floor(Math.random() * (randomSpawnPosY_MAX_D + 1 - randomSpawnPosY_MIN_D) + randomSpawnPosY_MIN_D)
                break
            case 'EUp':
                randomSpawnPosY = this.background.boundaryTop - ((this.h / 3) * 2.5)
                break
            case 'EDown':
                randomSpawnPosY = this.background.boundaryBottom - (this.h / 2)
                break
            case 'Z':
                randomSpawnPosY = (this.background.boundaryBottom - this.h) - this.background.boardwalkHeight
                break
        }
        return randomSpawnPosY
    }

    setSpeed() {
        let speedSet = 0
        const CplusSpeed_MAX = 100 * 2 //a decidir
        const CplusSpeed_MIN = 100 * 1.5 //a decidir
        const CplusSpeedRandom = (Math.floor(Math.random() * (CplusSpeed_MAX - CplusSpeed_MIN) + CplusSpeed_MIN)) / 100
        const CminusSpeed_MAX = 100 * 0.5 //a decidir
        const CminusSpeed_MIN = 100 * 0.1 //a decidir
        const CminusSpeedRandom = (Math.floor(Math.random() * (CminusSpeed_MAX - CminusSpeed_MIN) + CminusSpeed_MIN)) / 100

        switch (this.type) {
            case 'A':
            case 'B':
            case 'D':
            case 'EUp':
            case 'EDown':
            case 'Z':
                speedSet = this.background.speedX
                break
            case 'C+':
                speedSet = this.background.speedX * CplusSpeedRandom
                break
            case 'C-':
                speedSet = this.background.speedX * CminusSpeedRandom
                break
        }
        return speedSet
    }


    draw() {
        this.ctx.drawImage(this.skin, this.posX, this.posY, this.w, this.h)
        if (this.isConsumable()) {
            this.drawFlash()
        }
        this.move()
    }

    isConsumable() { // !!!!!!!! 
        if (this.player.phase === 1 && (this.type === 'A')) {
            return true
        } else if (this.player.phase === 2 && (this.type === 'A' || this.type === 'B')) {
            return true
        } else if (this.player.phase === 3 && (this.type === 'A' || this.type === 'B' || this.type === 'C+' || this.type === 'C-')) {
            return true
        } else if (this.player.phase === 4 && (this.type === 'A' || this.type === 'B' || this.type === 'C+' || this.type === 'C-' || this.type === 'D')) {
            return true
        } else if (this.player.phase === 5 && (this.type === 'A' || this.type === 'B' || this.type === 'C+' || this.type === 'C-' || this.type === 'D' || this.type === 'EUp' || this.type === 'EDown')) {
            return true
        } else if (this.player.phase === 6 && (this.type === 'A' || this.type === 'B' || this.type === 'C+' || this.type === 'C-' || this.type === 'D' || this.type === 'EUp' || this.type === 'EDown' || this.type === 'Z')) {
            return true
        } else {
            return false
        }
    }

    drawFlash() {
        this.flash++
        if (this.flash > (this.speedX * 2)) {
            this.ctx.drawImage(this.skinFlash, this.posX, this.posY, this.w, this.h)
            this.flash = 0
        }
    }

    move() {
        this.posX -= this.speedX
    }
}