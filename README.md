que fique claro, que o typescript não aguentou minha insistência me tipar:
![img.png](img.png)

[typescript playground](https://www.typescriptlang.org/play?ts=4.9.5#code/C4TwDgpgBA9gdhAKjAcgSwVAvFAjAHwCZ8BmfAFnwFZ8A2fAdnwA58BOAKFEigC8IATjGTpMOAAz4CxMpRr0mrTt2j8hyAMpoAHtiiTppCtTocu4aAE1rlvQANcbACQBvNcNQYIAX1fuRXt52UPhQdoTifoIeoj5R6p4IQWYqUACyafaRLvBIiT7BoQ6uBkTJ5jwAIpX2Jb45CAFJhWGu0vX++UEhYSQlUuUA9INQwGgAthApFlAAEgBK9rjxMYEt4StNBdM8aQCSKLVu0Zo6HScwWtrlqRoAogDCR52x5wmvdjvQiHtpAFrPC6vTZdABcIOBx3eay+UHmAEMAO6VeHACAaYACDAAcyONks3gAtK4MkTXNVvIhXAtvOCXPsULTXPcHkEANwVaAIxGICbozE4+xUlw0ukMpkuFnlADG8AAzsAoAATVEQUFwpEotEYrFwXE4ABEEQihPEVEJJHEiFwVFBhEIoPE4gNQA)

não tenho certeza como deveria mockar o mongoose (apesar de já ter feito unit tests com typeorm e postgress, nunca fiz com mongodb), mas, achei sobre o mockingoose, aparentemente é o caminho mais facil. 

nunca usei mas muito bom poder usar o atlas para fazer querys

![query](coutn_aggregatepng.png)

Bom no backend não tenho muito segredo, principalmente após começar a fazer as aggregations pelo atlas, irei abrir o meu DB para que possa ser feito as requests e testado o projeto, mas também vou adicionar um DB com docker, até pq ai posso testar mais uma vez o script de hydrate.

Dentro da API eu tentei manter a estrutura a mais simples mas legivel possivel, talvez não seja um padrão tão comum, mas mesmo que seguindo boas práticas, são penas padrões, e são adaptaveis, no nosso caso, para um projeto pequeno de alguns dias, preciso que isso seja facil de avaliar e refatorar, facil de achar, preciso que quem vá analisar, posso simplesmente analisar.
Então busco ao mesmo tempo que manter uma separação, manter uma linha de raciocinio para essa estrutura.

### Front-end

Já aqui, eu tentei fazer algo que realmente saisse do que venho fazendo, um projeto desses realmente não precisa necessariamente do nextjs e eu também não venho usando, então decidi usar agora, queria que os dados dos gráficos fossem facilmente achados e referenciados, tanto por engines quanto em embedds, então eu vou usar static props para fazer isso.

Eu realmente queria fazer tests end-2-end aqui no front end, mas acho que não vai dar tempo, bom, após apresentar eu faço.

da mesma forma, eu amo RTK, mas não vou usar nada demais, vou manter o fetch e context-api, fazer o melhor que da, afinal as requests não são complexas, o context-api cobre tudo, e eu gosto de não usar bazuca para matar mosca.

E isso pq eu adoro essas ferramentas como Nextjs ou Nestjs(meu favorito).
Mas convenhamos, vou usar toda uma estrutura, filosofia, maneira de codar e todos os padrões que esses frameworks tem, para fazer 2 GET? Acho que não fazer uma build enorme para uma listagem, é um sinal de bom desenvolvimento :)
