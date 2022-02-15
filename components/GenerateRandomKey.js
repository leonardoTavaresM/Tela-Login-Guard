const GenerateRandomKey = () => {
  let key = parseInt(Math.random() * 1000000);

  while (key <= 100000) {
    key = parseInt(Math.random() * 1000000);
  }

  return sessionStorage.setItem("authKey", key.toString());
};
GenerateRandomKey();

//funçao de utilidade
export function GetStoredObject(storageKey) {
  return sessionStorage.getItem(storageKey);
}
