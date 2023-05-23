module.exports = func => {
    return (req, res, next) => { 
      func(req, res, next).catch(next);
      // execute the accepted async function, then catching any errors and pass it to NEXT
    }
  }