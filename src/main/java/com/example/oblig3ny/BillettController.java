package com.example.oblig3ny;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BillettController {

    @Autowired
    private BillettRepository rep;

    @PostMapping("/lagre")
    public void lagreBillett (@RequestBody Billett innbillett){
        System.out.println("Received billett: " + innbillett);
        rep.lagreBillett(innbillett);
    }

    @GetMapping("/hentAlle")
    public List<Billett> hentAlle() {
        return rep.hentAlleBillett();
    }

    @GetMapping("/slettAlle")
    public void slettAlle() {
        rep.slettAlleBillett();
    }
}
