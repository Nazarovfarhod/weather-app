const KEY = "96b947a45d33d7dc1c49af3203966408";
//get request data

const getData = async (city) => {
  const base = "https://api.openweathermap.org/data/2.5/weather";
  const query = `?q=${city}&units=metric&appid=${KEY}`;
  loader(true);
  const request = await fetch(base + query);
  if(request.status!= 200){
  loader(false);
  throw new Error("Bunday shaxar mavjud emas :(")
  }
  const data = await request.json();
  loader(false);
  return data;
};
