const http = require('http');
const { fork } = require('child_process');
const PORT = 8990; const API='/api/v1';
const req=(m,p,b,t)=>new Promise((res,rej)=>{const d=b?JSON.stringify(b):'';const o={hostname:'localhost',port:PORT,path:p,method:m,headers:{'Content-Type':'application/json','Content-Length':Buffer.byteLength(d)}};if(t)o.headers['Authorization']='Bearer '+t;const r=http.request(o,r2=>{let x='';r2.on('data',c=>x+=c);r2.on('end',()=>res({s:r2.statusCode,b:x}))});r.on('error',rej);if(b)r.write(d);r.end()});
const get=(p,t)=>req('GET',p,null,t);const post=(p,b,t)=>req('POST',p,b,t);
async function wait(max=50){for(let i=0;i<max;i++){try{await get(API+'/health');return true}catch{await new Promise(r=>setTimeout(r,1500))}}return false}
(async()=>{
  const env={...process.env,NODE_ENV:'development',DB_HOST:'localhost',DB_PORT:'5446',DB_USERNAME:'alpacart',DB_PASSWORD:'alpacart',DB_NAME:'alpacart_r7v',REDIS_HOST:'localhost',REDIS_PORT:'6387',PORT:String(PORT),STRIPE_SECRET_KEY:'sk_test',STRIPE_WEBHOOK_SECRET:'whsec_test'};
  const server=fork(require.resolve('../dist/main.js'),[],{env});
  if(!await wait()){console.log('FAIL: startup');server.kill();process.exit(1)}
  let pass=0,fail=0;const ok=(n,c)=>{if(c){pass++;console.log('PASS:',n.substring(0,72))}else{fail++;console.log('FAIL:',n.substring(0,72))}};

  // 1. STAFF LOGIN
  const slog=await post(API+'/auth/login',{email:'mateo.q@alpacart.com',password:'Admin123!'});
  const st=JSON.parse(slog.b).data?.accessToken||JSON.parse(slog.b).accessToken||'';
  ok('Staff login works', slog.s===200||slog.s===201);
  ok('Staff has JWT', st.length>20);

  // 2. CUSTOMER LOGIN (customer from seed 007)
  const clog=await post(API+'/auth/customer-login',{email:'camila.g@email.com',password:'Cliente2024!'});
  const ct=JSON.parse(clog.b).data?.accessToken||JSON.parse(clog.b).accessToken||'';
  ok('Customer login works', clog.s===200||clog.s===201);
  ok('Customer has JWT', ct.length>20);

  // 3. AUTH /me (staff)
  const staffMe=await get(API+'/auth/me',st);
  ok('Staff /me returns profile', staffMe.s===200);
  const staffProfile=JSON.parse(staffMe.b);
  ok('Staff /me has user data', staffProfile.data?.name||staffProfile.name);

  // 4. AUTH /me (customer)
  const custMe=await get(API+'/auth/me',ct);
  ok('Customer /me returns profile', custMe.s===200);

  // 5. PUBLIC ENDPOINTS
  ok('Products public', (await get(API+'/products')).s===200);
  ok('Categories public', (await get(API+'/categories')).s===200);
  ok('Hero public', (await get(API+'/hero-slides')).s===200);
  ok('FAQ public', (await get(API+'/faq')).s===200);

  // 6. STAFF ENDPOINTS
  ok('Users staff', (await get(API+'/users',st)).s===200);
  ok('Orders staff', (await get(API+'/orders',st)).s===200);
  ok('Stock staff', (await get(API+'/stock',st)).s===200);
  ok('Analytics staff', (await get(API+'/analytics/kpis',st)).s===200);

  // 7. SECURITY
  ok('Users 401', (await get(API+'/users')).s===401);
  ok('Orders 401', (await get(API+'/orders')).s===401);
  ok('Checkout 401', (await post(API+'/checkout',{})).s===401);

  // 8. SETTINGS
  ok('Settings public', (await get(API+'/settings/company')).s===200);
  ok('Contact public', (await post(API+'/contact',{name:'R7V',email:'r7v@t.com',subject:'T',message:'M'})).s===201);
  ok('Coupon validate', (await post(API+'/coupons/validate',{code:'ALPA10',cartSubtotal:300})).s===200||201);

  console.log(`\n=== RESULTS: ${pass} PASS, ${fail} FAIL ===`);
  server.kill();process.exit(fail>0?1:0);
})();
