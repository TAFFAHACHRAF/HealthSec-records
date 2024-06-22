package healthcare.org.handlers;

import healthcare.org.exceptions.InvalidPatientDataException;
import healthcare.org.exceptions.PatientNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ExceptionHandling {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName;
            if (error instanceof FieldError) {
                fieldName = ((FieldError) error).getField();
            } else {
                fieldName = error.getObjectName();
            }
            errors.put(fieldName, error.getDefaultMessage());
        });
        return errors;
    }

    @ExceptionHandler({
            PatientNotFoundException.class,
            MethodArgumentTypeMismatchException.class,
            InvalidPatientDataException.class
    })
    public ResponseEntity<String> handleCustomExceptions(Exception e) {
        HttpStatus status = determineHttpStatus(e);
        return ResponseEntity.status(status).body(e.getMessage());
    }

    private HttpStatus determineHttpStatus(Exception e) {
        if (e instanceof PatientNotFoundException || e instanceof InvalidPatientDataException) {
            return HttpStatus.BAD_REQUEST;
        } else if (e instanceof MethodArgumentTypeMismatchException) {
            return HttpStatus.BAD_REQUEST;
        }

        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
}
