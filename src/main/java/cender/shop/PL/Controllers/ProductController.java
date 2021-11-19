package cender.shop.PL.Controllers;

import cender.shop.DL.Entities.Product;
import cender.shop.DL.Repositories.ProductsRepository;
import cender.shop.PL.DTO.Product.ProductDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.validation.Valid;


@Slf4j
@RestController
public class ProductController {
    @Autowired
    private ProductsRepository repository;
    @Autowired
    private ProductService


    @PostMapping(value = {"/addgame"})
    public ResponseEntity<Product> saveNewGame() {

        log.info("Game was added");
        return modelAndView;
    }

    //Удаление
    @PostMapping(value = {"/deletegame"})
    public String deleteGame(Model model){
        log.info("Game was removed");
        model.addAttribute("games", repository.findAll());

        return  "redirect:/allgames";
    }


}
