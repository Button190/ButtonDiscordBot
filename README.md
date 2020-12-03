Note: ping was averaging 133ms


TODO:
FIRST STEPS:

0-set up master user [next, authentication - discord!verify&google]
0-websocket (into the devicesconnection) to my computer (=> then also via user authentication).
0-custom procedures interpreter.

1- discord verify, as soon as authentication can be done.
2 - get and display data from api .get("/api").display()


- store/retrieve/execute stored expressions
- coonnect to dynamojs
- set create user [cryptographed password when local] (set some kind of temporary token [1 year duration or request for invalidation])
- set myself as admin
- set delete user
- set up "buckets":
 - .users.(thetechnolusId).auth <--> google_id
 -                              <--> discord username
 -                              <--> discord id
 -                              <--> twitter id
 -                              <--> facebook id
 -                              <--> email(1) [cryptographed password when local]
 -                              <--> email(2) [cryptographed password when local]
 -                              <--> email(...) [cryptographed password when local]
 - .users.(thetechnolusId).session <--> 
 - .users.(thetechnolusId).session <--> 
 - set up admin priviledges for me
 - set up share access to buckets/files
 - set up application definitions storage
 - set up user permanent setup storage
 

 Interaction should look like:
 (.) mem.pics.2020.01.01.bebedeira.1 (.) => get's an image link
 (.) mem.pics.2020.01.01.bebedeira (.) => get's a bunch of images in a json file (because it happened not to be a simple primitrive text object)
 (.) mem.pics.2020.01.01 (.) => get's a bunch of images in a json file (because it happened not to be a simple primitrive text object)
 (.) mem.pics (.) => get's a bunch of images in a json file (because it happened not to be a simple primitrive text object)
 (.) mem (.) => get's a bunch of sujections because it is not an exact primary key itself


 - have a way to execute stored procedures...
 (executes on enter, times out after some time if operation is long and then requests longer operation tie to the user)
 (.) .get() (.) => executes if pressed
 (.) .get("url") (.) => get's a stored procedure with parameter

 (.) .get("url").regex(/12323/i).0.display()  (.) => displays element matching url and regex
 (.) .get("url").class(".a").mem(0).class(".otherjsselector").mem("a").mem(0).0.display().  (.) => displays element matching url and regex
(save inline named memories, if fail)
(only recalculate the bit of the expression that was changed.)

.async().
.async(1).
.async("a").
.awaitall.
.await(). <= await latest?
.await(1).
.await(2).

data("bla").store(".something.something.have.completions.in.this.case.inside.store.and.the.quotation.marks")

procedures storage for each user, and for public

.authenticate(.get(.google.creds)).get().class().regex().

.js("").
javacriptEval without the ability to execute "()"