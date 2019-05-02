export class Focus {
    static elementById(name) {
        setTimeout(() => {
            document.getElementById(name).focus();
        }, 20);        
    }

    static selectElementById(name) {
        setTimeout(() => {
            document.getElementById(name).focus();
        }, 20);  
        setTimeout(() => {
            try {
                
                const element = document.getElementById(name) as HTMLInputElement;
                element.select()
            }catch (Exception )
            {
            // Code to handle exception
            }
            
        }, 50);
    }
}