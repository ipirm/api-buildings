

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDMsImNyZWF0ZWRBdCI6IjIwMjItMDMtMjNUMTQ6Mzg6NTUuMDcwWiIsInVwZGF0ZWRBdCI6IjIwMjItMDMtMjZUMTM6NTE6MzUuMjU0WiIsIm5hbWUiOiJlbHNlbiIsImVtYWlsIjoiZWxkYXJAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkSm1FMVZ6aEtKWVRPRHM0azlBV0sudXFoT1RuamZwem1VQTZTRG9EdEdxN2JGSWI3ZlY5S1ciLCJyb2xlIjoibWlkYSIsInNhbHQiOjYsImZyb21fZmxvb3IiOjEsInRvX2Zsb29yIjoxMiwic2NyZWVuIjoiaHR0cHM6Ly90dmlzZXJidWNrZXQuc3RvcmFnZS55YW5kZXhjbG91ZC5uZXQvbWlkYS9iMTc5OWUwNjBiZTBmZTg0ZDFlNDg1NjAwNDcxNmNlMi5wbmciLCJzdWNjZXNzIjpmYWxzZSwic3RhcnQiOiJ0aW1lciIsInN0YXJ0X3RpbWUiOiIwMTo0MzowMCIsInNwZWVkIjo3LCJwb3NpdGlvbiI6MSwib25saW5lIjpmYWxzZSwiaWF0IjoxNjQ4MjkxODk2LCJleHAiOjE2NDgzNzgyOTZ9.YH-lWwsf2Gbi45cGHVpDbxLsJgNTJB7NmG9nzA_-EL8'
// const socket = io('https://building.tviser.agency', {
const socket = io('http://localhost:8080', {
  withCredentials: false,
  auth: {
    token: token
  }
});

// let m = 0;
// document.querySelector('.thumbnail').addEventListener("click",(e)=>{
// m = m+1
// console.log(m)
// })
