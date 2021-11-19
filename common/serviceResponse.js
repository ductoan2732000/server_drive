

function serviceResponse(data, mes, status){
  return {
    data: data,
    mes: mes,
    status: status
  };
}

module.exports = {serviceResponse};