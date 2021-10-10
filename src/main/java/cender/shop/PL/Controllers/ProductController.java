package cender.shop.PL.Controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.websocket.server.PathParam;
import java.util.ArrayList;
import java.util.List;

@Controller
public class ProductController {

    private static final org.slf4j.Logger log =
            org.slf4j.LoggerFactory.getLogger(ProductController.class);
//
//    private static List<Product> productList = new ArrayList<Product>();
//    {
//        productList.add(new Product(1, "First game", "Its description", ProductGenre.Fighting.toString()));
//        log.info("/init");
//    }
//
//
//    @Value("${welcome.message}")
//    private String message;
//    @Value("${error.message}")
//    private String errorMessage;
//
//    @GetMapping(value = {"/", "/index"})
//    public ModelAndView index(Model model)
//    {
//        ModelAndView modelAndView = new ModelAndView();
//        modelAndView.setViewName("index");
//        model.addAttribute("message", message);
//        return modelAndView;
//    }
//
//    @GetMapping(value = {"/products"})
//    public ModelAndView personList(Model model)
//    {
//        ModelAndView modelAndView = new ModelAndView();
//        modelAndView.setViewName("products");
//        model.addAttribute("productList", productList);
//        return modelAndView;
//    }
//
//    @GetMapping(value = {"/add-product"})
//    public ModelAndView showAddPersonPage(Model model)
//    {
//        ModelAndView modelAndView = new ModelAndView("addProduct");
//        ProductDto productDto = new ProductDto();
//        model.addAttribute("productDto", productDto);
//        return modelAndView;
//    }
//
//     // @PostMapping("/addbook")
//     // GetMapping("/")
//
//     @PostMapping(value = {"/add-product"})
//     public ModelAndView savePerson(Model model, @ModelAttribute("productDto") ProductDto productDto)
//     {
//         ModelAndView modelAndView = new ModelAndView();
//        modelAndView.setViewName("addProduct");
//        String name = productDto.name;
//        String description = productDto.description;
//        ProductGenre genre = ProductGenre.Fighting;
//        if (name != null && name.length() > 0  && description != null && description.length() > 0)
//        {
//            Product newProduct = new Product(productList.size()+1, name, description, genre.toString());
//            productList.add(newProduct);
//            model.addAttribute("products" , productList);
//            return modelAndView;
//        }
//        model.addAttribute("errorMessage", errorMessage);
//        modelAndView.setViewName("addProduct");
//        return modelAndView;
//     }
//
//
//
//    @DeleteMapping(value = {"/remove-product"})
//    public ModelAndView deletePerson(Model model, @ModelAttribute("deleteForm") DeleteForm deleteForm) {
//        ModelAndView modelAndView = new ModelAndView();
//        modelAndView.setViewName("products");
//        int id = deleteForm.id;
//        if (id > 0) {
//            for (Product product : productList) {
//                if (product.id==deleteForm.id) {
//                    var p = product;
//                    productList.remove(product);
//                    model.addAttribute("products" , productList);
//                    return modelAndView;
//                }
//            }
//
//        }
//        model.addAttribute("errorMessage", errorMessage);
//        modelAndView.setViewName("products");
//        return modelAndView;
//    }
//
//    @GetMapping(value = {"/update-product"})
//    public ModelAndView showUpdateProduct(Model model, @ModelAttribute("deleteForm") DeleteForm deleteForm)
//    {
//        ModelAndView modelAndView = new ModelAndView("updateProduct");
//        var prod = new Product();
//        int id = deleteForm.id;
//        if (id > 0) {
//            for (Product product : productList) {
//                if (product.id==deleteForm.id) {
//                    prod = product;
//                }
//            }
//        }
//        model.addAttribute("product", prod);
//        return modelAndView;
//    }
//
//    @PostMapping(value = {"/update-product"})
//    public ModelAndView updateProduct(Model model, @ModelAttribute("product") Product prod)
//    {
//        ModelAndView modelAndView = new ModelAndView("updateProduct");
//        int id = prod.id;
//        if (id > 0) {
//            for (Product product : productList) {
//                if (product.id==id) {
//                    productList.set(productList.indexOf(product), prod);
//                }
//            }
//        }
//        model.addAttribute("product", prod);
//        return modelAndView;
//    }

}
