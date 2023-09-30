const Log = {
  i: (tag) => console.log.bind(this, "INFO => [", new Date().toString().slice(0, 24), "] =>",tag,"=>" ),
  e:  (tag) => console.error.bind(this, "ERROR => [", new Date().toString().slice(0, 24), "] =>",tag,"=>" ),
  w:  (tag) => console.warn.bind(this, "WARNING => [", new Date().toString().slice(0, 24), "] =>",tag,"=>" ),
};

export default Log