

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDMsImNyZWF0ZWRBdCI6IjIwMjItMDMtMjNUMTQ6Mzg6NTUuMDcwWiIsInVwZGF0ZWRBdCI6IjIwMjItMDMtMjVUMTI6NTA6NTEuMzM1WiIsIm5hbWUiOiJlbHNlbiIsImVtYWlsIjoiZWxkYXJAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkSm1FMVZ6aEtKWVRPRHM0azlBV0sudXFoT1RuamZwem1VQTZTRG9EdEdxN2JGSWI3ZlY5S1ciLCJyb2xlIjoibWlkYSIsInNhbHQiOjYsImZyb21fZmxvb3IiOjIsInRvX2Zsb29yIjo4LCJzY3JlZW4iOiJodHRwczovL3R2aXNlcmJ1Y2tldC5zdG9yYWdlLnlhbmRleGNsb3VkLm5ldC9taWRhLzIwYTMzZWFjYjg0ZThhZjlkNGJjMjkxMDgyMDk0NGRhLnBuZyIsInN1Y2Nlc3MiOmZhbHNlLCJzdGFydCI6InRpbWVyIiwic3RhcnRfdGltZSI6IjAwOjU0OjAyIiwic3BlZWQiOjEwLCJwb3NpdGlvbiI6Mywib25saW5lIjpmYWxzZSwiaWF0IjoxNjQ4MjAyMjk1LCJleHAiOjE2NDgyODg2OTV9.zH6NS35KAk7uJTpQtbH1rik7nzhoZt4eEhGd1prz5JQ'
// const socket = io('https://building.tviser.agency', {
const socket = io('https://building.tviser.agency/', {
  withCredentials: false,
  auth: {
    token: token
  }
});