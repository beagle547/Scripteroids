function Laser ( PlayerID, Type, X, Y, Winkel) {
	var Instanz = this, Projectile, BreiteS = 32, HoeheS = 32;
	this.Rad = BreiteS*.45;
	this.ObjSize = BreiteS/2;
	this.Explode = false;
	this.PosX = X - Instanz.ObjSize;
	this.PosY = Y - Instanz.ObjSize;
	this.OID = PlayerID-1;
	var DriftX = 0, DriftY = 0, Impuls = 12;
	var WHLock = false;
	this.SetWormholeLock = function () { WHLock = true; setTimeout(WormholeLock, 500) };
	this.GetWormholeLock = function () { return WHLock; };
	function WormholeLock () { WHLock = false; };
	var LifeTime = 1750;
	var Framerate = 60, TaktL, Takt = setInterval( Wiederholen, 1000 / Framerate);
	var Breite = window.innerWidth, Hoehe = window.innerHeight, Spielfeld = document.getElementById('mainframe');
	this.SetWindow = function (B, H) { Breite = B; Hoehe = H; };
	var PlayerLaser,	 PlayerLaserType	 = ['./img/laserRed.png'	 , './img/laserBlue.png'	 , './img/laserGreen.png'],
		PlayerLaserFade, PlayerLaserFadeType = ['./img/laserRed_fade.png', './img/laserBlue_fade.png', './img/laserGreen_fade.png'];
	
	if (PlayerID == 1) {
		PlayerLaser = PlayerLaserType[Type];
		PlayerLaserFade = PlayerLaserFadeType[Type];
	} else if (PlayerID == 2) {
		PlayerLaser = PlayerLaserType[Type];
		PlayerLaserFade = PlayerLaserFadeType[Type];
	}
	
	var Bogen = (Winkel-90)*Math.PI/180;
	DriftX = Impuls * Math.cos( Bogen );
	DriftY = Impuls * Math.sin( Bogen );
	
	var Element = document.createElement('img');
	Element.src = PlayerLaser;
	
	/*
	
	Instanz.PosX = Impuls * Math.cos( Bogen ) + X;
	Instanz.PosY = Impuls * Math.sin( Bogen ) + Y;
	
	if (((Winkel > 315) && (Winkel <= 360)) || ((Winkel >= 0) && (Winkel < 45))) // Top
		Instanz.PosY -= HoeheS*.5;
	else if ((Winkel > 135) && (Winkel < 225)) // Bot
		Instanz.PosY += BreiteS*.5;
	else if ((Winkel > 45) && (Winkel < 135)) // Right
		Instanz.PosX += BreiteS*.5;
	else if ((Winkel > 225) && (Winkel < 315)) // Left
		Instanz.PosX -= BreiteS*.5;
	else if (Winkel == 45) {
		Instanz.PosX += BreiteS*.5;
		Instanz.PosY -= HoeheS*.5;
	} else if (Winkel == 135) {
		Instanz.PosX += BreiteS*.5;
		Instanz.PosY += HoeheS*.5;
	} else if (Winkel == 225) {
		Instanz.PosX -= BreiteS*.5;
		Instanz.PosY += HoeheS*.5;
	} else if (Winkel == 315) {
		Instanz.PosX -= BreiteS*.5;
		Instanz.PosY -= HoeheS*.5;
	} */

	Element.style.top = Instanz.PosY + 'px';
	Element.style.left = Instanz.PosX + 'px';
	if(Math.random()*2&1)
		 Element.style.zIndex = '50';
	else Element.style.zIndex = '-50';
	
	
	Element.style.transform = 'rotate('+ Winkel + 'deg)';
	Spielfeld.appendChild(Element);
	TaktL = setTimeout (Destroy, LifeTime);
	var TheTime = new Date();
	Projectile = Element;
	Projectile.style.position = 'fixed';
	
	function Destroy () {
		clearInterval(Takt);
		Projectile.parentNode.removeChild( Projectile );
		for (l = gPlayer.MyLaser.length-1 ; l >= 0 ; l--)
			if(gPlayer.MyLaser[l] == Instanz) {
				gPlayer.MyLaser.splice(l, 1);
				break;
			}
	}
	
	function Wiederholen () {
		if(!gPause) {
			if(!TaktL)
				TaktL = setTimeout(Destroy, LifeTime);
			if(Instanz.Explode) {
				clearTimeout(TaktL);
				Projectile.src = PlayerLaserFade;
				setTimeout (Destroy, 30);
				clearInterval(Takt);
			}
			Bewegen();
		} else if(TaktL) {
			clearTimeout(TaktL); TaktL = null;
			LifeTime -= (new Date() - TheTime);
		}
	}
	
	function Bewegen () {		
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
			
		Projectile.style.transform = 'rotate('+ Winkel + 'deg)';
		Projectile.style.top = Instanz.PosY + 'px';
		Projectile.style.left = Instanz.PosX + 'px';
	}
}