function Raumschiff () {
	var Instanz = this; // Instanz referenz
	var Schiff, BreiteS = 64, HoeheS = 64;
	this.Rad = BreiteS*.47;
	this.ObjSize = BreiteS/2;
	this.Explode = false;
	var Spawn = true;
	this.Spawned = false;
	this.PosX = 0;
	this.PosY = 0;
	this.MyLaser = [];
	this.Score = 0;
	this.Points = -100;
	this.OID = 'Player';
	this.ActiveShield = null;
	var Type;
	// 0 included 2 => length of 3
	var MaxType = 2;
	// Type 0: Red 1: Blue 2: Green;
	var ColorID;
	var DriftX = 0, DriftY = 0;
	var Impuls = .2, VMax = 6, BeschleunigungV = 0;
	this.GetSpeed = function () { return BeschleunigungV; };
	var Accelerating = false;
	this.Winkel = 0;
	var Drehung = 3;
	// Energy values
	var EnergyDef = 100, Energy = EnergyDef;
	var EnergyCap = 100;
	var EnergyRecovery = .01;
	var PowerShot = false;
	var WHoleCosts;
	var WHoleDistance;
	var WHoleDuration;
	var WHoleActive = false;
	var WHoleActivated = false;
	var WHLock = false;
	this.SetWHActive = function () { WHoleActive = false; };
	this.SetWormholeLock = function () { WHLock = true; setTimeout(WormholeLock, 500) };
	this.GetWormholeLock = function () { return WHLock; };
	function WormholeLock () { WHLock = false; };
	// Zeit in ms!
	var CDShoot = 650;
	var ShieldDuration = 1000;
	var ShieldCosts = 0;
	var MissileCost = 0;
	var MissileReload = 1500;
	var MissileFired = false;
	
	// stats that can be upgraded depending on score:
	function StatsChanger ( value ) {

		switch ( value ) {
			// default
			case 0 :
				CDShoot = 1000;
				EnergyCap = 100;
				EnergyRecovery = .01;
				ShieldDuration = 5000;
				ShieldCosts = 20;
				WHoleDuration = 5000;
				WHoleDistance = 500;
				WHoleCosts = 50;
				MissileCost = 35;
				MissileReload = 2000;
				PowerShot = false;
			break;
			// Legendary
			case 1 :
				CDShoot = 200;
				EnergyCap = 180;
				EnergyRecovery = .07;
				ShieldDuration = 9500;
				ShieldCosts = 40;
				WHoleDuration = 500;
				WHoleDistance = 1000;
				WHoleCosts = 30;
				MissileCost = 20;
				MissileReload = 1000;
				PowerShot = true;
			break;
			// High
			case 2 :
				CDShoot = 500;
				EnergyCap = 140;
				EnergyRecovery = .04;
				ShieldDuration = 7000;
				ShieldCosts = 30;
				WHoleDuration = 1000;
				WHoleDistance = 750;
				WHoleCosts = 40;
				MissileCost = 25;
				MissileReload = 1500;
				PowerShot = false;
			break;
			// Medium
			case 3 :
				CDShoot = 750;
				EnergyCap = 120;
				EnergyRecovery = .02;
				ShieldDuration = 6000;
				ShieldCosts = 25;
				WHoleDuration = 3000;
				WHoleDistance = 500;
				WHoleCosts = 45;
				MissileCost = 30;
				MissileReload = 1800;
				PowerShot = false;
			break;
			// Low!
			case 4 :
				CDShoot = 1250;
				EnergyCap = 80;
				EnergyRecovery = .005;
				ShieldDuration = 3000;
				ShieldCosts = 40
				WHoleDuration = 7000;
				WHoleDistance = 300;
				WHoleCosts = 60;
				MissileCost = 40;
				MissileReload = 2500;
				PowerShot = false;
			break;
		}
		
		if(Energy > EnergyCap)
			Energy = EnergyCap;
	}
	
	// ---
	var BCDShoot = false;
	this.BShield = false;
	// W A S D - 87 65 83 68
	var Links = false, Oben = false, Rechts = false, Unten = false, Shoot = false, ShootM = false, Revive = false;
	var Framerate = 60, Takt = setInterval( Wiederholen, 1000 / Framerate );
	var Breite = window.innerWidth, Hoehe = window.innerHeight, Spielfeld = document.getElementById('mainframe'), StartPos = [];
	this.SetWindow = function (B, H) { Breite = B; Hoehe = H; }, this.SetStart = function () { if(Player == 1) { StartPos[0] = Instanz.PosX = (Breite >> 1)-Instanz.ObjSize; StartPos[1] = Instanz.PosY = (Hoehe >> 1)-Instanz.ObjSize; } else { StartPos[0] = Instanz.PosX = (Breite >> 1)+Instanz.ObjSize; StartPos[1] = Instanz.PosY = (Hoehe >> 1)-Instanz.ObjSize; } };
	this.GetType = function () { return Type; };
	this.SetThrust = function (bool) { Oben = bool};
	this.SetLinks = function (bool) { Links = bool};
	this.SetRechts = function (bool) { Rechts = bool};
	this.SetShoot = function (bool) { Shoot = bool};
	this.SetSpecial = function (bool) { ShootM = bool};
	this.SetShield = function (bool) { BShield = bool};
	var Ton = new Audio ('./ton/laser_shot.mp3') ;
	var Engine = new Audio ('./ton/schub.mp3') ;
		Engine.loop = true;

	this.CheckPShot = function () { return PowerShot; };
	var PlayerShipTypeSVG 		 = ['./img/shipRed.svg', './img/shipBlue.png', './img/shipGreen.png'],
		PlayerShipThrustTypeSVG  = ['./img/shipRed.gif', './img/shipBlue.gif', './img/shipGreen.gif'],
		PlayerShipExplodeSVG	 = './img/exploding_ship.png';
	var PlayerShipType 		 = ['./img/spritesheet.svg', './img/shipBlue.png', './img/shipGreen.png'],
		PlayerShipThrustType = ['./img/shipRed.gif', './img/shipBlue.gif', './img/shipGreen.gif'],
		PlayerShipExplode 	 = './img/exploding_ship.png';
	// shipRed.png

		Type = 0; ColorID = 'Red';
		StartPos.push(Instanz.PosX = (Breite >> 1)-Instanz.ObjSize);
		StartPos.push(Instanz.PosY = (Hoehe >> 1)-Instanz.ObjSize);
		document.getElementsByTagName('body')[0].addEventListener('keydown', Lenken);
		document.getElementsByTagName('body')[0].addEventListener('keyup', Lenken);

	/*
	var ElementSVG = document.createElement('svg');
	ElementSVG.width = '64';
	ElementSVG.height = '64';
	ElementSVG.style.top = StartPos[0] + 'px';
	ElementSVG.style.left = StartPos[1] + 'px';
	var Element = document.createElement('image');
	Element.setAttribute('xlink:href', './img/spritesheet.svg');
	Element.src = PlayerShipType[Type];
	Element.id = Instanz.OID;
	Element.style.width = BreiteS + 'px';
	Element.style.height = HoeheS + 'px';
	Element.style.objectFit = 'none';
	Element.style.objectPosition = '0 0';
	Element.style.zIndex = '100';
	ElementSVG.appendChild(Element);
	Spielfeld.appendChild(ElementSVG);
	Schiff = ElementSVG;
	*/
	
	var Element = document.createElement('img');
	Element.style.display = 'block';
	Element.style.position = 'fixed';
	Element.src = './img/spritesheet.svg';
	Element.id = Instanz.OID;
	//Element.style.transformOrigin = '';
	Element.style.width = BreiteS + 'px';
	Element.style.height = HoeheS + 'px';
	Element.style.objectFit = 'none';
	Element.style.objectPosition = '0 0';
	Element.style.zIndex = '99';
	Spielfeld.appendChild(Element);
	Schiff = Element;
	
	ReInitialise();

	function Runden ( Zahl ) {
		return Math.round ( Zahl*100 )/100
	}
	
	function Leeren ( Element ) {
		for (var i = Element.children.length -1 ; i >= 0 ; i--)
			Element.removeChild( Element.children[i])
	}
	
	function Lenken ( Ereignis ) {
	
		if(Instanz.Spawned)
			switch ( Ereignis.which ) {
				
				// Steuerung anfang
				// W
				case 87 : Oben = Ereignis.type == 'keydown';
				break;
				
				// A
				case 65 : Links = Ereignis.type == 'keydown';
				break;
				
				// S
				case 83 : Unten = Ereignis.type == 'keydown';
				break;
				
				// D
				case 68 : Rechts = Ereignis.type == 'keydown';
				break;
				// Steuerung ende
				
				// Space
				case 32 : Shoot = Ereignis.type == 'keydown';
				break;
				
				// F
				case 70 : Instanz.BShield = Ereignis.type == 'keydown';
				break;
				
				// R
				case 82 : if (!WHoleActivated) WHoleActivated = Ereignis.type == 'keydown';
				break;
				
				// Q
				case 81 : ShootM = Ereignis.type == 'keydown';
				break;

			}
		else
			switch ( Ereignis.which ) {
				
				// W
				case 87 : if(Ereignis.type == 'keydown') ChangeType(true);
				break;
				
				// S
				case 83 : if(Ereignis.type == 'keydown') ChangeType(false);
				break;
				
				// Space
				case 32 : if(Revive) ReInitialise();
				break;
				
			}
	}

	function ReInitialise () {
		Oben = false;
		Unten = false;
		Links = false;
		Rechts = false;
		Shoot = false;
		Revive = false;
		Spawn = false;
		BCDShoot = false;
		Instanz.Explode = false;
		Instanz.BShield = false;
		DriftX = 0;
		DriftY = 0;
		Instanz.Winkel = 0;
		Instanz.PosX = StartPos[0];
		Instanz.PosY = StartPos[1];
		FrameC = 0;
		Schiff.style.top = Instanz.PosY + 'px';
		Schiff.style.left = Instanz.PosX + 'px';
		Schiff.style.objectPosition = '0 0';
		Schiff.src = PlayerShipType[Type];
		Instanz.ActiveShield = new Schield(Instanz.PosX, Instanz.PosY, Instanz.Winkel, ShieldDuration);
		Instanz.Spawned = true;
		Spielfeld.appendChild(Element);
		Instanz.Score = Instanz.Score >> 1;
		Energy = EnergyDef;
		ShieldCosts = 0;
		Takt = setInterval( Wiederholen, 1000 / Framerate )
	}
	
	function Destroy () {
		Instanz.Spawned = false;
		Schiff.parentNode.removeChild( Schiff );
		Spawn = true;
		setTimeout(ReviveLock, 250);
	}
	
	function ReviveLock () {
		Revive = true;
	}
	
	function Wiederholen () {
		if(!gPause) {			
			if(Energy < EnergyCap) {
				Energy += EnergyRecovery;
			}
			
			if (Instanz.Explode) {
				FrameC = 0;
				clearInterval(Takt);
			}
			
			if ( ShootM && Energy >= MissileCost && !MissileFired ) {
				Energy -= MissileCost;
				MissileFired = true;
				gMissile.push(new Missile(1, Instanz.PosX + Instanz.ObjSize, Instanz.PosY + Instanz.ObjSize, Instanz.Winkel));
				setTimeout( ReloadMissile, MissileReload )
			}
			
			if ( Instanz.BShield && Energy >= ShieldCosts && !Instanz.ActiveShield ) {
				Energy -= ShieldCosts;
				Instanz.ActiveShield = new Schield(Instanz.PosX, Instanz.PosY, Instanz.Winkel, ShieldDuration);
				Instanz.BShield = false;
			} else
				Instanz.BShield = false;
			
			if (!WHoleActive && WHoleActivated && Energy >= WHoleCosts) {
				WHoleActive = true;
				Energy -= WHoleCosts;
				CreateWH(Instanz.PosX, Instanz.PosY, Instanz.Winkel);
			} else
				WHoleActivated = false;
			
			Bewegen();
			// Ausgeben();
		}
	}
	
	function CreateWH (X, Y, Winkel) {
		var Bogen = (Winkel-90)*Math.PI/180;
		var X2 = (WHoleDistance * Math.cos( Bogen )) + X;
		var Y2 = (WHoleDistance * Math.sin( Bogen )) + Y;
		
		if(Y2 < 0)
			Y2 = Hoehe - HoeheS*1.25;
		else if(Y2 > Hoehe )
			Y2 = Instanz.ObjSize;
		else if(X2 < 0)
			X2 = Breite - BreiteS*1.25;
		else if(X2 > Breite)
			X2 = Instanz.ObjSize;
		
		Wurmloch.push(new Wormhole (1, X , Y , WHoleDuration, Wurmloch.length+1));
		Wurmloch.push(new Wormhole (1, X2, Y2, WHoleDuration, Wurmloch.length-1));
	}
	
	function Beschleunigen () {
		
		var Bogen = (Instanz.Winkel-90)*Math.PI/180;
		var ImpulsX = Impuls * Math.cos( Bogen );
		var ImpulsY = Impuls * Math.sin( Bogen );
		
		var a = DriftX + ImpulsX ;
		var b = DriftY + ImpulsY ;
		BeschleunigungV = Math.sqrt( a*a + b*b ) ;
		if( BeschleunigungV <= VMax ) {
			if(!Accelerating) {
				Accelerating = true;
			}
			DriftX += ImpulsX;
			DriftY += ImpulsY;
		} else Accelerating = true;
	}
	
	function ShootCD () {
		
		BCDShoot = false;
	}
	
	function ReloadMissile () {
		MissileFired = false;
	}
	
	/*
	Spalte = Pos % 6;
	Zeile = Math.floor (Pos / 6);
	*/
	
	var Animation = setInterval(Animieren, 1000/24);
	var FrameC = 0, MaxFrames = 24;
	function Animieren () {
		
		if(Instanz.Explode) {
			FrameC+=2;
			Schiff.style.objectPosition = -(BreiteS*FrameC) + 'px -64px';
			if(FrameC == MaxFrames) Destroy();
		} else if(Oben && (FrameC < MaxFrames-1)) {
			if(Engine.paused) Engine.currentTime = 0;
			Engine.play();
			FrameC++;
			Schiff.style.objectPosition = -(BreiteS*FrameC) + 'px 0';
		}
		else if(FrameC) {
			FrameC-=2;
			if(FrameC < 0) FrameC = 0;
			Schiff.style.objectPosition = -(BreiteS*FrameC) + 'px 0';
		} else Engine.pause();
	}
	
	function Bewegen () {
		// Einstellen der Positions- und Rotationswerte
		if ( Oben && !Instanz.Explode ) {
			Beschleunigen();
		} else if ( Instanz.Explode && !Spawn ) { // veraltet..
		} else if (!Spawn){
			Accelerating = false;
		}

		if ( Shoot && !BCDShoot ) {
			Ton.currentTime = 0;
			Ton.play();
			BCDShoot = true;
			Instanz.MyLaser.push(new Laser(1, Type, Instanz.PosX + Instanz.ObjSize, Instanz.PosY + Instanz.ObjSize, Instanz.Winkel));
			setTimeout( ShootCD, CDShoot );
		}
		
		// regelmäßiger versatz
		
		Instanz.PosX += DriftX;
		Instanz.PosY += DriftY;
		
		if(Instanz.PosY < - Instanz.ObjSize )
			Instanz.PosY = Hoehe + Instanz.ObjSize;
		else if(Instanz.PosY > Hoehe + Instanz.ObjSize )
			Instanz.PosY = - Instanz.ObjSize;
		else if(Instanz.PosX < - Instanz.ObjSize )
			Instanz.PosX = Breite + Instanz.ObjSize;
		else if(Instanz.PosX > Breite + Instanz.ObjSize )
			Instanz.PosX = - Instanz.ObjSize;
		
		if ( Links ) if(Instanz.Winkel <= 0)
				Instanz.Winkel = 360;
			else 
				Instanz.Winkel -= Drehung;
		else if ( Rechts ) if(Instanz.Winkel >= 360)
				Instanz.Winkel = 0;
			else 
				Instanz.Winkel += Drehung;
			
		Schiff.style.transform = 'rotate('+ Instanz.Winkel + 'deg)';
		Schiff.style.top = Instanz.PosY + 'px';
		Schiff.style.left = Instanz.PosX + 'px';

	}
	
	function Ausgeben () {
		var Eintrag, Eintrag2, Inhalt, Ausgabe;
		var Alive = (Instanz.Explode) ? 'Destroyed' : 'Alive' ;
		var PIDC = (!Instanz.Explode) ? 'Alive' : 'Dead' ;
		var PIDE = 'EnergyH', PIDEn = 'Energy', PIDS = 'PScore';
		
		if(Instanz.Score >= 500) {
			PIDS = 'PScoreVH';
			StatsChanger (1);
		} else if(Instanz.Score >= 250) {
			PIDS = 'PScoreH';
			StatsChanger (2);
		} else if(Instanz.Score >= 100) {
			PIDS = 'PScoreM';
			StatsChanger (3);
		} else if(Instanz.Score >= 0) {
			PIDS = 'PScore';
			StatsChanger (0);
		} else {
			PIDS = 'PScoreL';
			StatsChanger (4);
		}
		
		Ausgabe = document.getElementById('P1');
		
		if(Energy >= 65)
			PIDE = 'EnergyH';
		else if(Energy >= 35)
			PIDE = 'EnergyM';
		else if(Energy > -1)
			PIDE = 'EnergyL';
		
		// Leeren( Ausgabe );
		
		if(PIDC == 'Alive') {
			Eintrag = document.createElement('li');
			Eintrag.id = PIDEn;
			Inhalt = document.createTextNode('Energy : ')			
			Eintrag.appendChild( Inhalt );
			Eintrag2 = document.createElement('span');
			Eintrag2.id = PIDE;
			Inhalt = document.createTextNode(Math.floor(Energy));
			Eintrag2.appendChild(Inhalt);
			Eintrag.appendChild(Eintrag2);
			Ausgabe.appendChild( Eintrag );
			Eintrag = document.createElement('li');
			Inhalt = document.createTextNode('Score : ');
			Eintrag.appendChild( Inhalt );
			Eintrag2 = document.createElement('span');
			Eintrag2.id = PIDS;
			Inhalt = document.createTextNode(Instanz.Score);
			Eintrag2.appendChild(Inhalt);
			Eintrag.appendChild(Eintrag2);
			Ausgabe.appendChild( Eintrag );
		} else {
			Eintrag = document.createElement('li');
			Inhalt = document.createTextNode('Press ');
			Eintrag.appendChild( Inhalt );
			Eintrag2 = document.createElement('span');
			Eintrag2.id = ColorID;
			Inhalt = document.createTextNode('Fire');
			Eintrag2.appendChild(Inhalt);
			Eintrag.appendChild(Eintrag2);
			Inhalt = document.createTextNode(' to join');
			Eintrag.appendChild( Inhalt );
			Ausgabe.appendChild( Eintrag );
		}
	}
}