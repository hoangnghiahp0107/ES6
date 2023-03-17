const URL ="https://640cb0a694ce1239b0b3693a.mockapi.io/api/products";
 function apiGetPerson(searchValue){
    return axios({
        method:"GET",
        url: URL,
        params: {
          name: searchValue || undefined,
        },
    });
}

 function apiCreatePerson(product){
  return axios({
    method: "POST",
    url: URL,
    data: product,
  });
}

 function apiDeletePerson(productID){
  return axios({
    method:"DELETE",
    url: `${URL}/${productID}`,
  });
}

 function apiGetPersonByID(productID){
  return axios({
    method: "GET",
    url: `${URL}/${productID}`,
  });
}

 function apiUpdatePerson(productID,product){
  return axios({
    method:"PUT",
    url: `${URL}/${productID}`,
    data:product,
  });
}