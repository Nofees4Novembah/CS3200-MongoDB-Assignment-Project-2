# CS3200-MongoDB-Assignment-Project-2

The following link refers to the hierarchal collection diagrams for the Assignment: [link](https://lucid.app/lucidchart/914d866a-48cb-4606-96c4-d9461425d23d/edit?invitationId=inv_fb156bf3-40f4-4152-9851-228156039e71&page=0_0#)

I have broken the Database into 4 separate collections:
- Users
- Properties
- Sublease_Listing_Collections
- Applications 

Example Json for the following collections can be found in [example/](example/)

The queries can be found in [src/_db/scripts/](src/_db/scripts/)

Note : The queries were carried out in DataGrip which utilises MongoShell, so please run them in DataGrip or MongoShell. running via `node ...` will not work.

AI Policy : AI was used to write the generation scripts for mock data, and writing the docker compose file. It however was not used to write queries, however it was used to lookup documentation and syntax.