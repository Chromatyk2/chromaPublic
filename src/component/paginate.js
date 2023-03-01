body {
    background: linear-gradient(45deg,#C6EC9B,#88E4B9);
}

img {
  display: block;
  margin: auto;
  width: 100px;
}
ul {
    display: flex;
    width: 50%;
    justify-content: space-around;
    margin: auto;
    list-style: none;
    padding: 0;
}
li a {
    color: #255748;
    text-decoration: none;
    font-size: 30px;
}
li{
    color: #255748;
    text-decoration: none;
    font-size: 30px;
}
.selected{
  font-weight: bold;
}
#root{
  height: 100vh;
}
.labelStats{
  font-weight: bold;
  line-height: 28px;
}
.valueStats{
  font-weight: bold;
  color: #255748;
  background-color: white;
  padding: 10px;
  border-radius: 88px;
  min-width: 88px;
  display: block;
  height: 30px;
  line-height: 10px;
  text-align: center;
  float: right;
  margin-left: 10px;
}
.infoPkm{
  position: absolute;
  top: 0;
}
.infoNbCapture{
  position: absolute;
  left: -19px;
  background-color: white;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  font-weight: bold;
  text-align: center;
}
.infoShiny{
    left: 90px;
    position: absolute;
    top: 105px;
    width: 25px;
    height: 25px;
    background-color: white;
    border-radius: 50%;
}
.stats{
    display: flex;
    gap: 30px;
    position: absolute;
    left: 4%;
}
.uniquePokemonContainer {
    background-position: 50%;
    background-repeat: no-repeat;
    background: rgba(37,87,72,.2);
    border-radius: 25%;
    -webkit-filter: drop-shadow(0 0 12px #000);
    filter: drop-shadow(0 0 12px black);
    padding: 15px;
}

.pokemonGlobalContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: auto;
  width: 50%;
  gap: 10px;
}
.inputPseudo{
  background-color: hsla(0,0%,100%,.9);
  border-radius: 25px;
  color: #255748;
  font-size: 40px;
  margin: 20px;
  text-align: center;
  width: 100%;
  border: black solid 4px;
}

.uploadPost{
  align-items: center;
    display: flex;
    justify-content: center;
}
.buttonPseudo{
  background-color: hsla(0,0%,100%,.9);
  border-radius: 25px;
  color: #255748;
  font-size: 25px;
  height: 50px;
  text-align: center;
  width: 50px;
  border: solid black 4px;
  position: absolute;
  right: 2%;
}
