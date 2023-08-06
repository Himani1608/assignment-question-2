function highlightHTMLContent(htmlContent, plainText, plainTextPositions) {
  
    plainTextPositions = plainTextPositions.sort((a, b) => a.start - b.start);
  
    let htmlpos= 0;
    let plainTextpos = 0;
    let s = 0;
    let e = 0;
    let flag = false;
    
    let temp = htmlContent;
    
    for (let i=0; i<plainTextPositions.length; i++) {
        const ele = plainTextPositions[i];
        let start = ele.start;
        let end = ele.end+1;
        
        while (htmlpos < htmlContent.length) {
            
            if (plainTextpos==start) {
                flag = true;
                s = htmlpos;
            }
            
            if (plainTextpos==end) {
                e = htmlpos;
                break;
            }
            
            if (htmlContent[htmlpos]=='<') {
                while (htmlContent[htmlpos]!='>') {
                    htmlpos++;
                }
                htmlpos++;
                continue;
            }
            
            if (htmlpos>0 && plainTextpos>0 && htmlContent[htmlpos-1]=='>') {
                plainTextpos++;
            }
            
            plainTextpos++;
            htmlpos++;
            
        }
    
      let starting = s + i*(13);
      let ending = e + i*(13);

      const startTag = "<mark>";
      const endTag = "</mark>";

      temp = temp.slice(0, starting) + startTag + temp.slice(starting, ending) + endTag + temp.slice(ending);
            
    }

    return temp;
    
}

let htmlContent = "<p><span>Hello Alice<br><br>Headline: TechCo Announces New Product Lineup for 2023</span></p>";
let plainText = "Hello Alice Headline: TechCo Announces New Product Lineup for 2023";

let plainTextPositions = [
  {start: 19, end: 27},
  {start: 6 , end: 17},
  {start: 30, end: 36}
]

console.log(highlightHTMLContent(htmlContent, plainText, plainTextPositions));
