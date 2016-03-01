function Asteroid ( Lvl, Px, Py, Wi, Si, Type, OldSize ) {
	var Instanz = this;
	var Planetoid, HoeheS = 100;
	this.BreiteS = 100;
	this.ObjSize;
	this.Size;
	this.Rad;
	this.Explode = false;
	this.PosX = 0;
	this.PosY = 0;
	this.OID;
	this.Points;
	this.Soft;
	this.Armored;
	var Random;
	var DriftX = 0, DriftY = 0;
	var Impuls = Math.random() *10 -5,
		Winkel,
		Drehung = Math.random();
	var WHLock = false;
	this.SetWormholeLock = function () { WHLock = true; setTimeout(WormholeLock, 500) };
	this.GetWormholeLock = function () { return WHLock; };
	function WormholeLock () { WHLock = false; };
	// W A S D - 87 65 83 68
	var Links = false, Oben = false, Rechts = false, Unten = false;
	var Framerate = 60, Takt = setInterval( Wiederholen, 1000 / Framerate), Locked = false;
	var Breite = window.innerWidth, Hoehe = window.innerHeight, Spielfeld = document.getElementsByTagName('body')[0];
	this.SetWindow = function (B, H) { Breite = B; Hoehe = H; }
	
	var PlanetoidType, PlanetoidExplode = './img/exploding_asteroid.png',
		PlanetoidA = './img/asteroid_brown.png', PlanetoidB = './img/asteroid_gray.png', PlanetoidBC = './img/asteroid_gray_cracked.png',
		PlanetoidAID = 'brown asteroid', PlanetoidBID = 'gray asteroid';
	
	this.ChangeSource = function () {Planetoid.src = PlanetoidBC; Instanz.Armored = false};
	
	// Parameter tests
	if(Px != -1)
		Instanz.PosX = Px;
	else
		Instanz.PosX = Math.random() * Breite;
	
	if(Py != -1)
		Instanz.PosY = Py;
	else {
		if(Math.random()*1 > .5)
			Instanz.PosY = 15;
		else Instanz.PosY = Hoehe - 15;
	}
	
	if(Wi != -1)
		Winkel = Wi;
	else
		Winkel = Math.random() *360;

	if(Si != -1) Instanz.Size = Si;
	
	// tests ende
	
	var Element = document.createElement('img');
	if(Type) {
		if(Type == PlanetoidAID) {
			PlanetoidType = PlanetoidA;
			Instanz.OID = PlanetoidAID;
			Armored = false;
		} else if(Type == PlanetoidBID) {
			PlanetoidType = PlanetoidB;
			Instanz.OID = PlanetoidBID;
		}
		Instanz.BreiteS = OldSize/2;
	} else {
		if (Math.random()*2&1) {
			PlanetoidType = PlanetoidA;
			Instanz.OID = PlanetoidAID;
			Random = Math.random();
			if(Random<.25)
				Random = .25;
			Instanz.BreiteS *= Random;
		} else {
			PlanetoidType = PlanetoidB;
			Instanz.OID = PlanetoidBID;
			Random = Math.random()*2;
			if(Random<.45)
				Random = .6;
			else if(Random>.6)
				Random = 1.5;
			Instanz.BreiteS *= Random;
		}
		Instanz.HoeheS = Instanz.BreiteS;
		
		if(Instanz.BreiteS >= 160)
			Instanz.Size = 3;
		else if(Instanz.BreiteS >= 80)
			Instanz.Size = 2;
		else if(Instanz.BreiteS >= 40)
			Instanz.Size = 1;
		else Instanz.Size = 0;
	}
	// Geschwindigkeit kleinere asteroiden => schneller
	Impuls = (Impuls/Instanz.BreiteS)* 50;
	Instanz.ObjSize = Instanz.BreiteS >> 1;
	Instanz.Rad = Instanz.BreiteS*.48;
	Instanz.Points = Math.ceil(Instanz.BreiteS*.1);
	
	if(Instanz.OID == PlanetoidAID) {
		Instanz.Armored = false;
		Instanz.Soft = true;
	} else {
		Instanz.Armored = true;
		Instanz.Soft = false;
		Instanz.Points = Math.ceil(Instanz.Points*1.2);
	}
	
	Instanz.Points = Math.ceil(Instanz.Points*(Lvl*.1+1));
	
	Element.style.width = Instanz.BreiteS +'px';
	Element.style.height = 'auto';
	Element.src = PlanetoidType;
	Element.style.top = Instanz.PosY - (Math.round(Instanz.BreiteS >> 1)) + 'px';
	Element.style.left = Instanz.PosX - (Math.round(Instanz.BreiteS >> 1)) + 'px';
	Spielfeld.appendChild(Element);	
	Planetoid = Element;
	Planetoid.style.position = 'fixed';
	var Bogen = (Winkel-90)*Math.PI/180;
	var ImpulsX = Impuls * Math.cos( Bogen );
	var ImpulsY = Impuls * Math.sin( Bogen );
	var a = DriftX += ImpulsX;
	var b = DriftY += ImpulsY;
	var BeschleunigungV = Math.sqrt( a*a + b*b );
	
	function Destroy () {
		Planetoid.parentNode.removeChild( Planetoid );
	}
	
	function Wiederholen () {
		if(!gPause) {
			if (Instanz.Explode) {
				Planetoid.src = PlanetoidExplode;
				setTimeout (Destroy, 45);
				clearInterval(Takt);
			}
			Bewegen();
		}
	}
	
	function Bewegen () {
		Instanz.PosX += DriftX;
		Instanz.PosY += DriftY;
		
		if(Instanz.PosY < - Instanz.ObjSize ) // Top
			Instanz.PosY = Hoehe + Instanz.ObjSize;
		else if(Instanz.PosY > Hoehe + Instanz.ObjSize ) // Bot
			Instanz.PosY = - Instanz.ObjSize;
		else if(Instanz.PosX < - Instanz.ObjSize ) // Left
			Instanz.PosX = Breite + Instanz.ObjSize;
		else if(Instanz.PosX > Breite + Instanz.ObjSize ) // Right
			Instanz.PosX = - Instanz.ObjSize;
		
		Planetoid.style.transform = 'rotate('+ (Winkel += Drehung) + 'deg)';
		Planetoid.style.top = Instanz.PosY + 'px';
		Planetoid.style.left = Instanz.PosX + 'px';
	}
}