function Missile ( PlayerID, X, Y, Winkel) {
	var Instanz = this, Projectile, BreiteS = 32, HoeheS = 45;
	this.Rad = BreiteS*.45;
	this.ObjSize = BreiteS/2;
	this.Explode = false;
	this.PosX = X - Instanz.ObjSize;
	this.PosY = Y - Instanz.ObjSize;
	this.OID = PlayerID -1;
	this.PID = 'Player ' + PlayerID;
	var DriftX = 0, DriftY = 0, Impuls = .2, VMax = 15, VMin = 1;
	var WHLock = false;
	this.SetWormholeLock = function () { WHLock = true; setTimeout(WormholeLock, 500) };
	this.GetWormholeLock = function () { return WHLock; };
	function WormholeLock () { WHLock = false; };
	var Fuel = 3850;
	var FuelEmpty = false;
	var Framerate = 60, TaktL = 1, Takt = setInterval( Wiederholen, 1000 / Framerate);
	var Breite = window.innerWidth, Hoehe = window.innerHeight, Spielfeld = document.getElementById('mainframe');
	this.SetWindow = function (B, H) { Breite = B; Hoehe = H; };
	var PlayerMissile = ['./img/missile.png'], PlayerMissileActive = ['./img/missileActive.png'], PlayerMissileFade = ['./img/exploding_missile.png'];
	TaktL = setTimeout (Stop, Fuel);
	var TheTime = new Date();
	
	var Element = document.createElement('img');
	Element.src = PlayerMissileActive;
	Element.style.top = Instanz.PosY + 'px';
	Element.style.left = Instanz.PosX + 'px';
	Element.style.transform = 'rotate('+ Winkel + 'deg)';
	Spielfeld.appendChild(Element);
	Projectile = Element;
	Projectile.style.position = 'fixed';
	
	function Destroy () {
		clearInterval(Takt);
		Projectile.parentNode.removeChild( Projectile );
	}
	
	function Wiederholen () {
		if(!gPause) {
			if(!TaktL) 
				TaktL = setTimeout (Stop, Fuel);
			if(Instanz.Explode) {
				Projectile.src = PlayerMissileFade;
				setTimeout (Destroy, 30);
				clearInterval(Takt);
			}
			if(!FuelEmpty)
				Accelerate();
			else if(V > VMin)
				DeAccelerate();
			Bewegen();
		} else if(TaktL) {
			clearTimeout(TaktL); TaktL = null;
			Fuel -= (new Date() - TheTime);
		}
	}
	
	function Accelerate () {
		var Bogen = (Winkel-90)*Math.PI/180;
		var ImpulsX = Impuls * Math.cos( Bogen );
		var ImpulsY = Impuls * Math.sin( Bogen );
		var a = DriftX + ImpulsX ;
		var b = DriftY + ImpulsY ;
		V = Math.sqrt( a*a + b*b ) ;
		
		if( V <= VMax ) {
			DriftX += ImpulsX;
			DriftY += ImpulsY;
		}
	}
	
	function DeAccelerate () {
		Element.src = PlayerMissile;
		var Bogen = (Winkel-270)*Math.PI/180;
		var ImpulsX = Impuls * Math.cos( Bogen );
		var ImpulsY = Impuls * Math.sin( Bogen );
		var a = DriftX + ImpulsX ;
		var b = DriftY + ImpulsY ;
		V = Math.sqrt( a*a + b*b ) ;
		
		if( V > VMin ) {
			DriftX += ImpulsX;
			DriftY += ImpulsY;
		}
	}
	
	function Stop () {
		FuelEmpty = true;
	}
	
	function Bewegen () {
		if(FuelEmpty && !(V > VMin)) {
			clearInterval(Takt);
			Takt = setInterval(Wiederholen2, 1000 / Framerate);
		}
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
	
	function Wiederholen2 () {
		if(Instanz.Explode) {
			Projectile.src = PlayerMissileFade;
			setTimeout (Destroy, 30);
			clearInterval(Takt);
		}
		Winkel++;
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